#!/bin/bash
set -euo pipefail

TARFILE=hof-starter-kit--$1.tar.gz

tar -cz -f $TARFILE \
  README.md \
  LICENSE \
  dsl

