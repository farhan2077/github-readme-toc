const readmeExists = document.querySelector('[title="README.md" i]'); // i at the end make's the query selector case-insensitive

if (readmeExists) {
  const readmeElement = document.querySelector(
    "article.markdown-body.entry-content"
  );

  const headings = readmeElement.querySelectorAll("h1, h2, h3, h4, h5, h6");

  const formattedHeadings = Array.from(headings).map((heading) => {
    const level = parseInt(heading.tagName[1]); // h1 -> 1, h2 -> 2 ...

    // find the <a> tag immediately following the heading
    const anchorTag =
      heading.nextElementSibling?.tagName === "A"
        ? heading.nextElementSibling
        : null;
    const link = anchorTag ? anchorTag.getAttribute("href") : null;

    return {
      text: heading.textContent, // textContent is faster over innerText
      level: level,
      link: link,
    };
  });

  const contentBody = document.createElement("div");
  contentBody.style.maxHeight = "100vh";
  contentBody.style.overflowY = "auto";
  contentBody.style.marginRight = "1rem";
  contentBody.style.paddingBottom = "4rem";

  formattedHeadings.forEach(({ text, level, link }) => {
    const linkWrapper = document.createElement("div");
    linkWrapper.className = "mb-2";
    linkWrapper.style.marginLeft = `${level - 1}rem`;

    const anchor = document.createElement("a");
    anchor.href = link;
    anchor.textContent = text;

    linkWrapper.appendChild(anchor);
    contentBody.appendChild(linkWrapper);
  });

  const githubGridRow = document.createElement("div");
  githubGridRow.className = "BorderGrid-row"; // from github
  githubGridRow.style.position = "initial";
  githubGridRow.style.minHeight = "100vh";

  const githubGridCell = document.createElement("div");
  githubGridCell.className = "BorderGrid-cell"; // from github

  const githubGridHeading = document.createElement("h2");
  githubGridHeading.className = "h4 mb-3"; // from github
  githubGridHeading.textContent = "Table of Contents";

  githubGridCell.appendChild(githubGridHeading);
  githubGridCell.appendChild(contentBody);
  githubGridCell.style.borderWidth = "0px";

  githubGridRow.appendChild(githubGridCell);

  // from github
  const githubAboutContainer = document.querySelector(
    ".BorderGrid.about-margin"
  );

  let originalTop = null;
  let isScrolling = false;

  window.addEventListener("scroll", () => {
    if (!githubGridRow) return;

    // calculate original position only once
    if (originalTop === null) {
      const rect = githubGridRow.getBoundingClientRect();
      originalTop = rect.top + window.scrollY;
    }

    function updatePosition() {
      if (
        window.scrollY > originalTop &&
        githubGridRow.style.position !== "fixed"
      ) {
        githubGridRow.style.position = "fixed";
        githubGridRow.style.top = "0px";
      } else if (
        window.scrollY <= originalTop &&
        githubGridRow.style.position !== "initial"
      ) {
        githubGridRow.style.position = "initial";
      }
    }

    if (!isScrolling) {
      isScrolling = true;

      // only update styles when necessary
      requestAnimationFrame(() => {
        updatePosition();
        isScrolling = false;
      });
    }
  });

  githubAboutContainer.appendChild(githubGridRow);
}
