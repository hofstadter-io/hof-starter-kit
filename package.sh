#!/bin/bash
set -euo pipefail

TARFILE=hof-dsl-fullstack-kit--$1.tar.gz

tar -cz -f $TARFILE \
  README.md \
  LICENSE \
  design \
  dsl

