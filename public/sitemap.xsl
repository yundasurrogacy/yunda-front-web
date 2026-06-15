<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet
  version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sm="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
  <xsl:output method="html" encoding="UTF-8" indent="yes" />

  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Yunda Surrogacy Sitemap</title>
        <style>
          :root {
            color-scheme: light;
            --ink: #2d2118;
            --muted: #796c61;
            --line: #e7ded5;
            --paper: #fffaf4;
            --panel: #ffffff;
            --accent: #a35a3a;
            --accent-soft: #f7e6dc;
            --green: #527c5c;
          }

          * {
            box-sizing: border-box;
          }

          body {
            margin: 0;
            background:
              radial-gradient(circle at top left, rgba(163, 90, 58, 0.12), transparent 30rem),
              linear-gradient(135deg, #fffaf4 0%, #f6efe8 100%);
            color: var(--ink);
            font-family: Georgia, "Times New Roman", serif;
            line-height: 1.55;
          }

          main {
            width: min(1180px, calc(100% - 32px));
            margin: 0 auto;
            padding: 48px 0;
          }

          header {
            margin-bottom: 28px;
          }

          .eyebrow {
            color: var(--accent);
            font-family: "Trebuchet MS", Verdana, sans-serif;
            font-size: 0.78rem;
            font-weight: 700;
            letter-spacing: 0.14em;
            text-transform: uppercase;
          }

          h1 {
            margin: 8px 0 10px;
            font-size: clamp(2.1rem, 5vw, 4rem);
            line-height: 1;
          }

          .summary {
            max-width: 780px;
            margin: 0;
            color: var(--muted);
            font-family: "Trebuchet MS", Verdana, sans-serif;
            font-size: 1rem;
          }

          .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 12px;
            margin: 24px 0;
          }

          .stat {
            border: 1px solid var(--line);
            border-radius: 8px;
            background: rgba(255, 255, 255, 0.74);
            padding: 16px;
          }

          .stat-label {
            color: var(--muted);
            font-family: "Trebuchet MS", Verdana, sans-serif;
            font-size: 0.78rem;
            font-weight: 700;
            text-transform: uppercase;
          }

          .stat-value {
            display: block;
            margin-top: 4px;
            color: var(--accent);
            font-size: 1.8rem;
            font-weight: 700;
          }

          .table-wrap {
            overflow: auto;
            border: 1px solid var(--line);
            border-radius: 8px;
            background: var(--panel);
            box-shadow: 0 18px 50px rgba(45, 33, 24, 0.08);
          }

          table {
            width: 100%;
            border-collapse: collapse;
            font-family: "Trebuchet MS", Verdana, sans-serif;
            font-size: 0.94rem;
          }

          th {
            position: sticky;
            top: 0;
            background: #4c382c;
            color: #fffaf4;
            font-size: 0.76rem;
            letter-spacing: 0.08em;
            text-align: left;
            text-transform: uppercase;
          }

          th,
          td {
            padding: 14px 16px;
            border-bottom: 1px solid var(--line);
            vertical-align: top;
          }

          tr:nth-child(even) td {
            background: #fffdf9;
          }

          a {
            color: var(--accent);
            font-weight: 700;
            text-decoration: none;
            overflow-wrap: anywhere;
          }

          a:hover {
            text-decoration: underline;
          }

          .badge {
            display: inline-flex;
            align-items: center;
            border-radius: 999px;
            background: var(--accent-soft);
            color: var(--accent);
            padding: 0.18rem 0.58rem;
            font-size: 0.78rem;
            font-weight: 700;
            white-space: nowrap;
          }

          .priority {
            color: var(--green);
            font-weight: 700;
          }

          .alternates {
            display: grid;
            gap: 5px;
            min-width: 220px;
          }

          .alternate {
            color: var(--muted);
            font-size: 0.82rem;
          }

          .alternate span {
            color: var(--ink);
            font-weight: 700;
          }

          footer {
            margin-top: 20px;
            color: var(--muted);
            font-family: "Trebuchet MS", Verdana, sans-serif;
            font-size: 0.86rem;
          }

          @media (max-width: 720px) {
            main {
              width: min(100% - 20px, 1180px);
              padding: 28px 0;
            }

            th,
            td {
              padding: 11px 12px;
            }
          }
        </style>
      </head>
      <body>
        <main>
          <header>
            <div class="eyebrow">Yunda Surrogacy</div>
            <h1>Sitemap</h1>
            <p class="summary">
              This XML sitemap is styled for browser review. Search engines still receive the standard sitemap markup.
            </p>
          </header>

          <xsl:choose>
            <xsl:when test="sm:sitemapindex">
              <xsl:call-template name="sitemap-index" />
            </xsl:when>
            <xsl:otherwise>
              <xsl:call-template name="urlset" />
            </xsl:otherwise>
          </xsl:choose>

          <footer>
            Generated XML sitemap with browser-friendly styling.
          </footer>
        </main>
      </body>
    </html>
  </xsl:template>

  <xsl:template name="sitemap-index">
    <section class="stats">
      <div class="stat">
        <span class="stat-label">Sitemap Files</span>
        <span class="stat-value"><xsl:value-of select="count(sm:sitemapindex/sm:sitemap)" /></span>
      </div>
    </section>
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>File</th>
            <th>Last Modified</th>
          </tr>
        </thead>
        <tbody>
          <xsl:for-each select="sm:sitemapindex/sm:sitemap">
            <tr>
              <td>
                <a href="{sm:loc}"><xsl:value-of select="sm:loc" /></a>
              </td>
              <td><span class="badge"><xsl:value-of select="sm:lastmod" /></span></td>
            </tr>
          </xsl:for-each>
        </tbody>
      </table>
    </div>
  </xsl:template>

  <xsl:template name="urlset">
    <section class="stats">
      <div class="stat">
        <span class="stat-label">URLs</span>
        <span class="stat-value"><xsl:value-of select="count(sm:urlset/sm:url)" /></span>
      </div>
      <div class="stat">
        <span class="stat-label">Alternate Links</span>
        <span class="stat-value"><xsl:value-of select="count(sm:urlset/sm:url/xhtml:link)" /></span>
      </div>
    </section>
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>URL</th>
            <th>Last Modified</th>
            <th>Frequency</th>
            <th>Priority</th>
            <th>Alternates</th>
          </tr>
        </thead>
        <tbody>
          <xsl:for-each select="sm:urlset/sm:url">
            <tr>
              <td>
                <a href="{sm:loc}"><xsl:value-of select="sm:loc" /></a>
              </td>
              <td><span class="badge"><xsl:value-of select="sm:lastmod" /></span></td>
              <td><xsl:value-of select="sm:changefreq" /></td>
              <td><span class="priority"><xsl:value-of select="sm:priority" /></span></td>
              <td>
                <div class="alternates">
                  <xsl:for-each select="xhtml:link">
                    <div class="alternate">
                      <span><xsl:value-of select="@hreflang" /></span>
                      <xsl:text>: </xsl:text>
                      <a href="{@href}"><xsl:value-of select="@href" /></a>
                    </div>
                  </xsl:for-each>
                </div>
              </td>
            </tr>
          </xsl:for-each>
        </tbody>
      </table>
    </div>
  </xsl:template>
</xsl:stylesheet>
