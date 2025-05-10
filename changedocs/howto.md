# How to Add Documentation or Change Notes to the changedocs Folder

If your contribution requires updates to the official Gamemodstudios Docs website for this extension, you can add documentation or change notes directly to this `changedocs` folder. When your changes are published, the contents of this folder will be reviewed and integrated into the website.

## Steps to Add a File

1. **Create a Markdown File:**
   - In the `changedocs` folder, create a new file with a descriptive name, such as `feature-xyz.md` or `bugfix-abc.md`.
   - Use the `.md` extension (Markdown format).

2. **Write Your Documentation or Notes:**
   - Clearly describe the change, feature, or update.
   - Include any relevant usage instructions, screenshots, or examples.
   - If the change affects existing documentation, reference the affected sections.

3. **Commit and Push:**
   - Add the new file to your branch: `git add changedocs/your-file.md`
   - Commit your changes: `git commit -m "Add docs for feature XYZ"`
   - Push your branch and submit a pull request as usual.

## Example

```bash
# Improved Mod Project Scaffolding

- Added new prompts for author and game name.
- Updated the default template to include a description field.
- See the updated usage instructions in the main README.
```

---

By following these steps, you help keep the official documentation up to date for all users!
