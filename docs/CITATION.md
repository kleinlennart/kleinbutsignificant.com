The Pandoc forms that match the natbib commands:

| natbib | write | renders as |
|---|---|---|
| `\citet{key}` | `@key` | Wong (2011) |
| `\citet[p.~441]{key}` | `@key [441]` | Wong (2011, 441) |
| `\citep{key}` | `[@key]` | (Wong 2011) |
| `\citep[p.~441]{key}` | `[@key, 441]` | (Wong 2011, 441) |
| `\citep{a,b}` | `[@a; @b]` | (Ostrom 1990; Wong 2011) |
| `\citeyearpar{key}` | `[-@key]` | (2011) |