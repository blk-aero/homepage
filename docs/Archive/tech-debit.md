# Tech Debit

## Homepage PRD Review Follow-ups

Source: pre-PR code review of the homepage PRD implementation, range
`c52a9d8..df5bd2c`.

Resolved in the fresh homepage cleanup:

- Homepage WhatsApp CTAs now include the shared WhatsApp brand icon.
- Active homepage hero images were converted from large PNG files to WebP files.
- Temporary support pages render inside `BaseLayout` without nested `main` landmarks.
- Carousel state is handled by the tested `src/lib/homepage-carousel.ts` module.
- Conversion-flow tests no longer preserve Tailwind class assertions for the final CTA.
