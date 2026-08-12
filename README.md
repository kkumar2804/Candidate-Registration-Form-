# Candidate-Registration-Form-
## Description

Added a candidate registration page for HR to use before scheduling interviews. The page includes a form with fields for Name, Email, Phone, Position Applied For, and Resume Upload. Includes client-side validation for required fields, email format, phone format, and resume file type (PDF/DOC/DOCX). On submit, it sends form data (including the resume file) to a POST /api/candidates endpoint using FormData, and shows success/error feedback to the user.

Fixes # (no linked issue — standalone feature addition)

## Type of change

- [ ] Bug fix (non-breaking change which fixes an issue)
- [x] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Checklist:

- [x] My code follows the style guidelines of this project
- [x] I have performed a self-review of my code
- [x] I have commented my code, particularly in hard-to-understand areas
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
- [ ] Any dependent changes have been merged and published in downstream modules
- [x] I have only committed once
