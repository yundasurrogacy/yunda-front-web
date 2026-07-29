#!/usr/bin/env python3
"""
Weekly SEO monitoring for yundasurrogacy.com.

Collects Google Search Console, GA4, CrUX, sitemap status, and SEO drift
comparisons, then writes JSON and Markdown reports under .seo-monitor/.
"""

from __future__ import annotations

import json
import os
import statistics
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SEO_SCRIPTS = Path("/Users/qianwenyi/.codex/skills/seo/scripts")
OUT_DIR = ROOT / ".seo-monitor"
RUNS_DIR = OUT_DIR / "runs"
LATEST_JSON = OUT_DIR / "latest.json"
LATEST_MD = OUT_DIR / "latest.md"
DRIFT_URLS = [
    "https://www.yundasurrogacy.com/",
    "https://www.yundasurrogacy.com/be-parents",
    "https://www.yundasurrogacy.com/be-surrogate",
    "https://www.yundasurrogacy.com/surrogacy-cost",
    "https://www.yundasurrogacy.com/surrogacy-process",
    "https://www.yundasurrogacy.com/surrogate-requirements",
    "https://www.yundasurrogacy.com/surrogate-compensation",
    "https://www.yundasurrogacy.com/screening",
    "https://www.yundasurrogacy.com/journey",
    "https://www.yundasurrogacy.com/blog",
    "https://www.yundasurrogacy.com/zh",
    "https://www.yundasurrogacy.com/zh/surrogacy-cost",
    "https://www.yundasurrogacy.com/zh/surrogate-requirements",
]


def env(use_proxy: bool = True) -> dict[str, str]:
    e = os.environ.copy()
    if not use_proxy:
        for key in ["ALL_PROXY", "HTTPS_PROXY", "HTTP_PROXY", "all_proxy", "https_proxy", "http_proxy"]:
            e.pop(key, None)
        e.setdefault("NO_PROXY", "localhost,127.0.0.1,www.yundasurrogacy.com,yundasurrogacy.com")
        return e
    proxy = e.get("SEO_PROXY", "socks5h://127.0.0.1:7897")
    e.setdefault("ALL_PROXY", proxy)
    e.setdefault("HTTPS_PROXY", proxy)
    e.setdefault("HTTP_PROXY", proxy)
    e.setdefault("GA4_TRANSPORT", "rest")
    return e


def run_json(args: list[str], timeout: int = 240, use_proxy: bool = True) -> dict:
    try:
        proc = subprocess.run(
            args,
            cwd=str(SEO_SCRIPTS),
            env=env(use_proxy=use_proxy),
            text=True,
            capture_output=True,
            timeout=timeout,
        )
    except subprocess.TimeoutExpired:
        return {"error": f"Timed out after {timeout}s", "command": args}

    stdout = proc.stdout.strip()
    try:
        data = json.loads(stdout) if stdout else {}
    except json.JSONDecodeError:
        data = {"error": "Could not parse JSON output", "stdout": stdout[-2000:]}

    if proc.returncode != 0 and not data.get("error"):
        data["error"] = (proc.stderr or f"Command exited {proc.returncode}").strip()
    if proc.stderr.strip():
        data.setdefault("stderr", proc.stderr.strip()[-2000:])
    return data


def pct_change(new: float, old: float) -> float | None:
    if old == 0:
        return None
    return ((new - old) / old) * 100


def sum_rows(rows: list[dict]) -> dict:
    clicks = sum(float(r.get("clicks", 0)) for r in rows)
    impressions = sum(float(r.get("impressions", 0)) for r in rows)
    weighted_position = 0.0
    if impressions:
        weighted_position = sum(float(r.get("position", 0)) * float(r.get("impressions", 0)) for r in rows) / impressions
    return {
        "clicks": round(clicks, 2),
        "impressions": round(impressions, 2),
        "ctr": round((clicks / impressions) * 100, 3) if impressions else 0,
        "position": round(weighted_position, 2) if weighted_position else 0,
    }


def date_trend_alerts(gsc_date: dict) -> list[dict]:
    rows = gsc_date.get("rows", [])
    if len(rows) < 10:
        return [{"severity": "info", "source": "gsc", "message": "Not enough daily rows for week-over-week anomaly detection."}]

    rows = sorted(rows, key=lambda r: r.get("date", ""))
    current = rows[-7:]
    previous = rows[-14:-7]
    cur = sum_rows(current)
    prev = sum_rows(previous)
    alerts: list[dict] = []

    for metric in ["clicks", "impressions", "ctr"]:
        change = pct_change(cur[metric], prev[metric])
        if change is not None and change <= -25:
            alerts.append({
                "severity": "warning",
                "source": "gsc",
                "metric": metric,
                "message": f"{metric} dropped {change:.1f}% vs previous 7 days.",
                "current": cur[metric],
                "previous": prev[metric],
            })

    if cur["position"] and prev["position"] and cur["position"] - prev["position"] >= 5:
        alerts.append({
            "severity": "warning",
            "source": "gsc",
            "metric": "position",
            "message": f"Average position worsened by {cur['position'] - prev['position']:.1f}.",
            "current": cur["position"],
            "previous": prev["position"],
        })

    if not alerts:
        alerts.append({"severity": "ok", "source": "gsc", "message": "No week-over-week GSC anomaly detected."})
    return alerts


def query_alerts(gsc_queries: dict) -> list[dict]:
    alerts: list[dict] = []
    rows = gsc_queries.get("rows", [])
    for row in rows[:50]:
        impressions = float(row.get("impressions", 0))
        position = float(row.get("position", 0))
        ctr = float(row.get("ctr", 0))
        query = row.get("query") or " | ".join(row.get("keys", []))
        if impressions >= 500 and position <= 10 and ctr < 0.5:
            alerts.append({
                "severity": "warning",
                "source": "gsc",
                "metric": "ctr",
                "message": f"High-impression low-CTR query: {query}",
                "impressions": impressions,
                "position": position,
                "ctr": ctr,
            })
    return alerts[:20]


def compare_with_previous(report: dict) -> list[dict]:
    if not LATEST_JSON.exists():
        return [{"severity": "info", "source": "history", "message": "No prior weekly monitor snapshot found."}]
    try:
        previous = json.loads(LATEST_JSON.read_text())
    except Exception as exc:
        return [{"severity": "info", "source": "history", "message": f"Could not read prior snapshot: {exc}"}]

    alerts: list[dict] = []
    current_totals = report.get("gsc", {}).get("date", {}).get("totals", {})
    previous_totals = previous.get("gsc", {}).get("date", {}).get("totals", {})
    for metric in ["clicks", "impressions", "ctr"]:
        cur = float(current_totals.get(metric, 0))
        prev = float(previous_totals.get(metric, 0))
        change = pct_change(cur, prev)
        if change is not None and change <= -30:
            alerts.append({
                "severity": "warning",
                "source": "history",
                "metric": metric,
                "message": f"{metric} is down {change:.1f}% vs previous monitor run.",
                "current": cur,
                "previous": prev,
            })
    if not alerts:
        alerts.append({"severity": "ok", "source": "history", "message": "No large drop vs previous monitor run."})
    return alerts


def collect() -> dict:
    generated_at = datetime.now(timezone.utc).isoformat()
    report: dict = {
        "generated_at": generated_at,
        "property": "https://www.yundasurrogacy.com/",
        "domain": "yundasurrogacy.com",
        "alerts": [],
        "gsc": {},
        "ga4": {},
        "crux": {},
        "sitemaps": {},
        "drift": {},
    }

    report["gsc"]["date"] = run_json([
        sys.executable, "gsc_query.py", "--property", report["property"],
        "--days", "28", "--dimensions", "date", "--limit", "100", "--json",
    ])
    report["gsc"]["queries"] = run_json([
        sys.executable, "gsc_query.py", "--property", report["property"],
        "--days", "28", "--dimensions", "query", "--limit", "250", "--json",
    ])
    report["gsc"]["pages"] = run_json([
        sys.executable, "gsc_query.py", "--property", report["property"],
        "--days", "28", "--dimensions", "page", "--limit", "250", "--json",
    ])
    report["sitemaps"] = run_json([
        sys.executable, "gsc_query.py", "sitemaps", "--property", report["property"], "--json",
    ])
    report["ga4"] = run_json([
        sys.executable, "ga4_report.py", "--property", "properties/505632329", "--json",
    ])
    report["crux"]["homepage"] = run_json([
        sys.executable, "pagespeed_check.py", report["property"], "--crux-only", "--json",
    ])

    drift_results = []
    for url in DRIFT_URLS:
        drift_results.append(run_json([sys.executable, "drift_compare.py", url, "--skip-cwv"], timeout=120, use_proxy=False))
    report["drift"]["comparisons"] = drift_results

    report["alerts"].extend(date_trend_alerts(report["gsc"].get("date", {})))
    report["alerts"].extend(query_alerts(report["gsc"].get("queries", {})))
    report["alerts"].extend(compare_with_previous(report))
    for comparison in drift_results:
        summary = comparison.get("summary", {})
        if summary.get("critical", 0) or summary.get("warning", 0):
            report["alerts"].append({
                "severity": "critical" if summary.get("critical", 0) else "warning",
                "source": "drift",
                "url": comparison.get("url"),
                "message": f"SEO drift detected: {summary.get('critical', 0)} critical, {summary.get('warning', 0)} warning.",
            })
        elif comparison.get("error"):
            report["alerts"].append({
                "severity": "warning",
                "source": "drift",
                "url": comparison.get("url"),
                "message": comparison["error"],
            })

    return report


def render_markdown(report: dict) -> str:
    gsc_totals = report.get("gsc", {}).get("date", {}).get("totals", {})
    ga4_totals = report.get("ga4", {}).get("totals", {})
    crux_metrics = report.get("crux", {}).get("homepage", {}).get("metrics", {})
    drift = report.get("drift", {}).get("comparisons", [])
    drift_counts = {
        "critical": sum(c.get("summary", {}).get("critical", 0) for c in drift),
        "warning": sum(c.get("summary", {}).get("warning", 0) for c in drift),
        "info": sum(c.get("summary", {}).get("info", 0) for c in drift),
    }

    lines = [
        "# Weekly SEO Monitor",
        "",
        f"- Generated: {report.get('generated_at')}",
        f"- Property: {report.get('property')}",
        "",
        "## Search Console",
        "",
        f"- Clicks: {gsc_totals.get('clicks', 0)}",
        f"- Impressions: {gsc_totals.get('impressions', 0)}",
        f"- CTR: {gsc_totals.get('ctr', 0)}%",
        f"- Date range: {report.get('gsc', {}).get('date', {}).get('date_range', {})}",
        "",
        "## GA4 Organic",
        "",
        f"- Sessions: {ga4_totals.get('sessions', 0)}",
        f"- Users: {ga4_totals.get('users', 0)}",
        f"- Pageviews: {ga4_totals.get('pageviews', 0)}",
        "",
        "## Core Web Vitals",
        "",
    ]
    for key, metric in crux_metrics.items():
        lines.append(f"- {metric.get('label', key)}: {metric.get('p75')} {metric.get('unit', '')} ({metric.get('rating')})")

    lines.extend([
        "",
        "## SEO Drift",
        "",
        f"- Critical: {drift_counts['critical']}",
        f"- Warning: {drift_counts['warning']}",
        f"- Info: {drift_counts['info']}",
        "",
        "## Alerts",
        "",
    ])
    for alert in report.get("alerts", []):
        lines.append(f"- **{alert.get('severity', 'info').upper()}** [{alert.get('source')}] {alert.get('message')}")

    lines.extend(["", "## Files", "", "- Raw JSON is stored beside this Markdown report in `.seo-monitor/runs/`."])
    return "\n".join(lines) + "\n"


def main() -> int:
    OUT_DIR.mkdir(exist_ok=True)
    RUNS_DIR.mkdir(exist_ok=True)
    report = collect()
    stamp = datetime.now().strftime("%Y-%m-%d-%H%M%S")
    json_path = RUNS_DIR / f"{stamp}.json"
    md_path = RUNS_DIR / f"{stamp}.md"
    json_text = json.dumps(report, indent=2, ensure_ascii=False)
    md_text = render_markdown(report)
    json_path.write_text(json_text)
    md_path.write_text(md_text)
    LATEST_JSON.write_text(json_text)
    LATEST_MD.write_text(md_text)
    print(str(md_path))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
