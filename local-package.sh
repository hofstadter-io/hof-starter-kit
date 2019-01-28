#!/bin/bash
set -euo pipefail

TAG=${1:-branch}

if [[ "$TAG" == "branch" ]]; then
    TAG=$(git branch | grep \* | cut -d ' ' -f2)
    echo "TAG = '$TAG'"
fi

# eval $(minikube docker-env)

cloud-build-local -config cloudbuild-local.yaml --dryrun=false \
  -substitutions _TAG_NAME=${TAG} .

