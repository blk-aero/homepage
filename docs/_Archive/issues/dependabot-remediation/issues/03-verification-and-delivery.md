# Choose verification and delivery

Type: grilling
Status: resolved
Blocked by: 02

## Question

What checks and delivery steps will demonstrate that the selected upgrades preserve the site and address the original alerts and newly discovered audit findings?

## Answer

- Perform a clean install and run `npm audit`; investigate remaining findings and document any alert dismissal with its evidence.
- Run the repository's release checks: build, unit tests, built-output tests, relevant browser tests, and link checks with a local server. Run the content-surface check when changing the content schema. Report the exact commands, outcomes, and any checks that cannot run.
- Check that the supported Node environment works for both the GitHub Pages build and local Docker development.
- Prepare one tested change for review, splitting it if compatibility problems require that. After it reaches the default branch, check the original Dependabot alerts and report their states; dismiss only those without a compatible fix, using an accurate reason.
