#!/bin/bash

# 多语言 SEO 验证脚本
# 使用方法: ./scripts/verify-seo.sh [生产URL或localhost:3000]

BASE_URL="${1:-http://localhost:3000}"

echo "🔍 开始验证多语言 SEO 配置..."
echo "📍 目标 URL: $BASE_URL"
echo ""

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 检查函数
check_item() {
    local description=$1
    local command=$2
    local expected=$3
    
    echo -n "检查: $description... "
    
    if eval "$command" | grep -q "$expected"; then
        echo -e "${GREEN}✓${NC}"
        return 0
    else
        echo -e "${RED}✗${NC}"
        return 1
    fi
}

# 测试页面
EN_PAGE="/about"
ZH_PAGE="/zh/about"

echo "="
echo "1. 验证英文页面 ($BASE_URL$EN_PAGE)"
echo "="

# 检查 HTML lang 属性
check_item "HTML lang='en'" "curl -s $BASE_URL$EN_PAGE" 'lang="en"'

# 检查 hreflang 标签
check_item "hreflang en-US" "curl -s $BASE_URL$EN_PAGE" 'hreflang="en-US"'
check_item "hreflang zh-CN" "curl -s $BASE_URL$EN_PAGE" 'hreflang="zh-CN"'
check_item "hreflang x-default" "curl -s $BASE_URL$EN_PAGE" 'hreflang="x-default"'

# 检查 canonical
check_item "Canonical URL" "curl -s $BASE_URL$EN_PAGE" 'rel="canonical"'

echo ""
echo "="
echo "2. 验证中文页面 ($BASE_URL$ZH_PAGE)"
echo "="

# 检查 HTML lang 属性
check_item "HTML lang='zh'" "curl -s $BASE_URL$ZH_PAGE" 'lang="zh"'

# 检查 hreflang 标签
check_item "hreflang en-US" "curl -s $BASE_URL$ZH_PAGE" 'hreflang="en-US"'
check_item "hreflang zh-CN" "curl -s $BASE_URL$ZH_PAGE" 'hreflang="zh-CN"'
check_item "hreflang x-default" "curl -s $BASE_URL$ZH_PAGE" 'hreflang="x-default"'

# 检查 canonical
check_item "Canonical URL" "curl -s $BASE_URL$ZH_PAGE" 'rel="canonical"'

echo ""
echo "="
echo "3. 验证 Sitemap"
echo "="

# 检查 sitemap.xml
check_item "Sitemap 可访问" "curl -s -o /dev/null -w '%{http_code}' $BASE_URL/sitemap.xml" "200"

# 检查 sitemap 内容
if curl -s "$BASE_URL/sitemap.xml" | grep -q "urlset"; then
    echo -e "检查: Sitemap 格式... ${GREEN}✓${NC}"
else
    echo -e "检查: Sitemap 格式... ${RED}✗${NC}"
fi

echo ""
echo "="
echo "4. 验证 URL 结构"
echo "="

# 检查英文页面（无前缀）
if curl -s -o /dev/null -w '%{http_code}' "$BASE_URL$EN_PAGE" | grep -q "200"; then
    echo -e "检查: 英文页面可访问 ($BASE_URL$EN_PAGE)... ${GREEN}✓${NC}"
else
    echo -e "检查: 英文页面可访问 ($BASE_URL$EN_PAGE)... ${RED}✗${NC}"
fi

# 检查中文页面（带 /zh 前缀）
if curl -s -o /dev/null -w '%{http_code}' "$BASE_URL$ZH_PAGE" | grep -q "200"; then
    echo -e "检查: 中文页面可访问 ($BASE_URL$ZH_PAGE)... ${GREEN}✓${NC}"
else
    echo -e "检查: 中文页面可访问 ($BASE_URL$ZH_PAGE)... ${RED}✗${NC}"
fi

echo ""
echo "="
echo "5. 详细检查结果"
echo "="

echo ""
echo "📄 英文页面 hreflang 标签:"
curl -s "$BASE_URL$EN_PAGE" | grep -i "hreflang" | head -3

echo ""
echo "📄 中文页面 hreflang 标签:"
curl -s "$BASE_URL$ZH_PAGE" | grep -i "hreflang" | head -3

echo ""
echo "✅ 验证完成！"
echo ""
echo "💡 提示:"
echo "   - 如果看到红色 ✗，请检查对应的配置"
echo "   - 访问 Google Search Console 提交 sitemap"
echo "   - 使用在线工具进一步验证: https://technicalseo.com/tools/hreflang/"
