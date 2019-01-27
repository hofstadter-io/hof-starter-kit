# hof-starter-kit

Hofstadter Studios DSL for the starter tier.

### development setup

You should be able to develop `hof-starter-kit`
without a full development setup.
Most work will happen from the `studios-app` directory.

First, you will need three repos:

- geb
- hof-starter-kit
- studios-app

then, to get studios-app running locally,
run the following from the `studios-app` directory.

__Terminal 1:__

```
geb gen
```

__Terminal 2:__

```
cd output/packages/client
HOF_CLIENT_COMPONENT=true yarn watch
```

__Terminal 3:__

```
cd output/packages/server
HOF_SERVER_COMPONENT=true yarn seed
HOF_SERVER_COMPONENT=true yarn watch
```

use the app from http://localhost:3000

You can then change files in `hof-starter-kit`
and rerun `geb gen` in terminal-1.
Updates should be seen in the output directory
and possibly in the client/server logs
if you have effected them sufficiently.

### Building

GCloud Builder automatically packages for branches / tags.

To manually package and upload to Cloud Storage:

```
./local-package.sh <some-unique-or-local-tag> .
```

if you omit the argument, the current `branch` is used.

