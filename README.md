# hof-starter-kit

Hofstadter Studios DSL for the starter tier.

Built automatically for branches / tags.

To manually package and upload to Cloud Storage:

```
cloud-build-local -config ci/gcp/cloudbuild-local.yaml --dryrun=false \
  -substitutions _TAG_NAME=<some-unique-or-local-tag> .
```
