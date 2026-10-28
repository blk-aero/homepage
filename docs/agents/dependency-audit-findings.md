# Dependency audit findings

Checked with `npm audit` after the dependency upgrade on 28 October 2026.

The remaining advisory is [GHSA-gcqx-w48m-w2h4](https://github.com/advisories/GHSA-gcqx-w48m-w2h4), a low severity prototype poisoning issue in `deepmerge` versions `>=4.2.0 <=4.3.1`. The lockfile contains `deepmerge@4.3.1` through this dependency path:

```text
flowbite@4.0.2
└─ flowbite-datepicker@2.0.0
   └─ @rollup/plugin-node-resolve@15.3.1
      └─ deepmerge@4.3.1
```

`npm audit` reports four affected package nodes from this chain (`flowbite`, `flowbite-datepicker`, `@rollup/plugin-node-resolve`, and `deepmerge`). Its proposed automatic remediation is to downgrade Flowbite to `2.3.0`, a major-version downgrade from the installed `4.0.2`. The current `deepmerge` line has no version outside the advisory range, and the resolver declares a `^4.2.2` dependency. No override or compatible fix has been established, so do not claim this finding is fixed. Review the parent package path and exposure before deciding whether to dismiss any related GitHub alert; no alert has been dismissed.

The audit returned four low severity package nodes and no moderate, high, or critical findings. This local npm audit result does not establish GitHub Dependabot alert states or prove whether the datepicker code is reachable in the built site.
