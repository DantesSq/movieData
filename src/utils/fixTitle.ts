type Movie = {
    oldTitle: string;
    newTitle: string;
    bracketsValue: string;
  };

const endsWithArticle = (movie: Movie): Movie => {
    const { newTitle } = movie;
    const length = newTitle.length;
    if (newTitle.endsWith(", A"))
      movie.newTitle = `A ${newTitle.slice(0, length - 3)}`;
    if (newTitle.endsWith(", An"))
      movie.newTitle = `An ${newTitle.slice(0, length - 4)}`;
    if (newTitle.endsWith(", The"))
      movie.newTitle = `The ${newTitle.slice(0, length - 5)}`;
  
    return movie;
  };
  
  const bracketsDivider = (movie: Movie): Movie => {
    const bracketsPattern = /\(.*\)/;
  
    const { newTitle } = movie;
  
    if (bracketsPattern.test(newTitle)) {
      const bracketsIndex = newTitle.indexOf(" (");
      const clearTitle = newTitle.slice(0, bracketsIndex);
      const bracketsValue = newTitle.slice(bracketsIndex + 1);
      movie.newTitle = clearTitle;
      movie.bracketsValue = bracketsValue;
    }
  
    return movie;
  };
  
  const checkPatterns = (movie: Movie): Movie => {
    const { newTitle } = movie;
  
    let normalizedTitle = "";
    let boolean = false;
  
    const patternEp = /, The S\d{2}E\d{2}$/;
    const patternEpA = /, A S\d{2}E\d{2}$/;
    const patternEpAn = /, An S\d{2}E\d{2}$/;
  
    const patternSeasonWtArticle = /S\d{2}E\d{2}$/;
  
    if (patternEp.test(newTitle)) {
      const indexThe = newTitle.indexOf(", The");
      normalizedTitle = `The ${newTitle.slice(0, indexThe)}`;
      movie.newTitle = normalizedTitle;
      return movie;
    }
  
    if (patternEpA.test(newTitle)) {
      const indexA = newTitle.indexOf(", A");
      normalizedTitle = `A ${newTitle.slice(0, indexA)}`;
      movie.newTitle = normalizedTitle;
      return movie;
    }
  
    if (patternEpAn.test(newTitle)) {
      const indexA = newTitle.indexOf(", An");
      normalizedTitle = `An ${newTitle.slice(0, indexA)}`;
      movie.newTitle = normalizedTitle;
      return movie;
    }
  
    if (patternSeasonWtArticle.test(newTitle)) {
      normalizedTitle = `${newTitle.slice(0, newTitle.length - 7)}`;
      movie.newTitle = normalizedTitle;
      return movie;
    }
  
    return movie;
  };
  
  const modifyTitle = (movie: Movie): Movie => {
    const { newTitle } = movie;
  
    let prefix = "";
    let suffix = "";
  
    if (newTitle.includes(", The:")) {
      const index = newTitle.indexOf(", The:");
      if (index !== -1) {
        prefix = newTitle.substring(0, index);
        suffix = newTitle.substring(index + 6);
        const correctedTitle = `The ${prefix}:${suffix}`;
        movie.newTitle = correctedTitle;
      }
    } else if (newTitle.includes(", A:")) {
      const index = newTitle.indexOf(", A:");
      if (index !== -1) {
        prefix = newTitle.substring(0, index);
        suffix = newTitle.substring(index + 4);
        const correctedTitle = `A ${prefix}:${suffix}`;
        movie.newTitle = correctedTitle;
      }
    } else if (newTitle.includes(", An:")) {
      const index = newTitle.indexOf(", An:");
      if (index !== -1) {
        prefix = newTitle.substring(0, index);
        suffix = newTitle.substring(index + 5);
        const correctedTitle = `An ${prefix}:${suffix}`;
        movie.newTitle = correctedTitle;
      }
    }
    return movie;
  };
  
export const titleNormalizer = (titlesArr: string[]) => {
    const normalizedTitlesArr: Movie[] = [];
  
    for (const title of titlesArr) {
      const movie = { oldTitle: title, newTitle: title, bracketsValue: "None" };
  
      const endsWithArticleTitle = endsWithArticle(movie);
      const bracketsDividerTitle = bracketsDivider(endsWithArticleTitle);
      const endsWithArticleBracketsTitle = endsWithArticle(bracketsDividerTitle);
      const checkPatternsTitle = checkPatterns(endsWithArticleBracketsTitle);
      const finalTitle = modifyTitle(checkPatternsTitle);
  
      normalizedTitlesArr.push(finalTitle);
    }

    const oldTitlesArr = normalizedTitlesArr.map((title) => title.oldTitle);
    const newTitlesArr = normalizedTitlesArr.map((title) => title.newTitle);
    const bracketsValuesArr = normalizedTitlesArr.map(
      (title) => title.bracketsValue
    );
  
    console.log("oldTitles:", oldTitlesArr);
    console.log("newTitlesArr:", newTitlesArr);
    console.log("bracketsValuesArr:", bracketsValuesArr);
  };
  