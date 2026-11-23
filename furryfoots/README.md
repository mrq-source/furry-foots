# Furry Foots

## Editing gallery photos and testimonials

This site uses Pages CMS. Its repository configuration is in `../.pages.yml`; editable content is in `src/content/site-content.json`, and uploaded images are stored in `public/uploads`.

1. Sign in to [Pages CMS](https://app.pagescms.org) with GitHub and grant it access to this repository.
2. Select this repository and its publishing branch.
3. Open **Pet room and testimonials** to add, edit, reorder, or remove entries.
4. Save the changes. Pages CMS commits them to GitHub; commits to `main` trigger the GitHub Pages workflow.

The React app imports the content JSON at build time. Run the Vite build after changing content locally to verify it:

```sh
npm run build
```

On first setup, set the repository's **Settings → Pages → Build and deployment → Source** to **GitHub Actions**.
