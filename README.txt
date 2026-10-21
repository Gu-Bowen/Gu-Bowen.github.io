Bowen Gu Academic Homepage — October 2026 update patch

This patch adds the following to an existing maintainable V5.5 website:
1. The October 2026 IEEE Internet of Things Journal paper, with B. Gu marked as corresponding author and DOI link.
2. Youth Editorial Board Member, Journal of Communications (《通信学报》), 2027–2029.
3. Upcoming conference activity in Wuxi, 2026.10.31–11.02.
4. Upcoming conference activity in Fuzhou, 2026.11.06–11.08.

It also adds corresponding recent-news entries. Existing content is preserved, and running the script repeatedly will not duplicate these entries.

HOW TO APPLY (Windows)
1. Download and unzip this patch.
2. Copy apply_updates.py into the root folder of your local Gu-Bowen.github.io repository (the same folder as index.html).
3. Open PowerShell or Command Prompt in that folder.
4. Run: python apply_updates.py
   (Python 3 is required.)
5. In GitHub Desktop, review the changed data/*.js files and commit/push to master.
6. Once deployment succeeds, refresh https://gu-bowen.github.io/.

The script creates .bak backups of the data files before changing them. It does not overwrite index.html, CSS, JavaScript, CV, or other site structure.
