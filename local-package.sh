#!/bin/bash
set -euo pipefail

TAG=${1}

cloud-build-local -config cloudbuild-local.yaml --dryrun=false \
  -substitutions _TAG_NAME=${TAG} .

