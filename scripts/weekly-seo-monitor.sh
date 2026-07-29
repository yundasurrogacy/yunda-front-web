#!/usr/bin/env bash
set -euo pipefail

cd /Users/qianwenyi/Documents/yunda-front-web-1

export ALL_PROXY="${SEO_PROXY:-socks5h://127.0.0.1:7897}"
export HTTPS_PROXY="${SEO_PROXY:-socks5h://127.0.0.1:7897}"
export HTTP_PROXY="${SEO_PROXY:-socks5h://127.0.0.1:7897}"
export GA4_TRANSPORT="${GA4_TRANSPORT:-rest}"

mkdir -p .seo-monitor/logs
/Library/Frameworks/Python.framework/Versions/3.13/bin/python3 scripts/weekly-seo-monitor.py
