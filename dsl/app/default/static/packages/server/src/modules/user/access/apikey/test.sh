#!/bin/bash
set -euo pipefail

KEY="$1"
URL="http://localhost:8081/graphql"

curl -v -X POST \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $KEY" \
    -d @data.json \
    "$URL"


