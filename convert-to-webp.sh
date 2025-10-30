#!/bin/bash

# WebP Conversion Script for Portfolio Images
# This script converts JPG and PNG images to WebP format with optimal quality

echo "🔄 Converting images to WebP format..."

# Create webp directory if it doesn't exist
mkdir -p public/images/webp

# Convert all JPG images
for file in public/images/*.jpg; do
    if [ -f "$file" ]; then
        filename=$(basename "$file" .jpg)
        echo "📸 Converting $filename.jpg to $filename.webp"
        cwebp -q 85 "$file" -o "public/images/webp/${filename}.webp" 2>/dev/null
    fi
done

# Convert all JPEG images
for file in public/images/*.jpeg; do
    if [ -f "$file" ]; then
        filename=$(basename "$file" .jpeg)
        echo "📸 Converting $filename.jpeg to $filename.webp"
        cwebp -q 85 "$file" -o "public/images/webp/${filename}.webp" 2>/dev/null
    fi
done

# Convert all PNG images
for file in public/images/*.png; do
    if [ -f "$file" ]; then
        filename=$(basename "$file" .png)
        echo "🖼️ Converting $filename.png to $filename.webp"
        cwebp -q 85 "$file" -o "public/images/webp/${filename}.webp" 2>/dev/null
    fi
done

echo "✅ Image conversion completed!"
echo ""
echo "📊 Statistics:"
echo "Original files:"
find public/images -maxdepth 1 -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" \) -exec du -h {} + | sort -hr

echo ""
echo "WebP files:"
find public/images/webp -type f -name "*.webp" -exec du -h {} + | sort -hr

echo ""
echo "💡 To use WebP images, your LazyImage component will automatically:"
echo "   1. Try to load the .webp version first"
echo "   2. Fallback to the original format if WebP is not supported"
echo "   3. Show loading placeholders during conversion"
