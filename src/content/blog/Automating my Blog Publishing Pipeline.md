---
title: 'Automating my Blog Publishing Pipeline'
description: ''
pubDate: 'Nov 28 2024'
---

As an individual who likes to utilize Obsidian for their note taking and writing needs, I wanted to streamline the process of publishing blog posts to my website. Here is how I built a script to automate this workflow.

## The Problem

The writing process looked like the following:
1. Write post in obsidian
2. Manually copy markdown file to my blog repository
3. Add frontmatter manually
4. Commit and push changes

## The Solution

I created a python script that does the following:
1. Monitors a specific "publish" folder in my Obsidian vault
2. Automatically adds required frontmatter (title, date, description)
3. Copies files to my blog's content directory
4. Moves processed files to a "published" folder in my vault
5. Commits and pushes changes to Git

### Frontmatter Generation

```python
def generate_frontmatter(title):
    title = title.replace('.md', '').replace('-', ' ')
    today = datetime.now().strftime('%b %-d %Y')
    return f"""---
title: '{title}'
description: ''
pubDate: '{today}'
---
"""
```

## Usage

1. Write post in Obsidian
2. Move to `publish` folder
3. Run script
4. Post appears on blog with proper formatting

## Benefits

- No manual file copying
- Consistent frontmatter formatting
- Automatic git operations
- Clear separation between draft and published content
- Maintains original files in Obsidian

The complete code is available on [Github](https://github.com/chrisdettloff/scripts/blob/main/publish_blog.py)