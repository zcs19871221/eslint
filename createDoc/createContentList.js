const createContentList = rules => {
    const title = '## 目录\n\n';
    const aLinks = rules
    .map((ruleName, index) => `${index + 1}. [${ruleName}](#${ruleName})`)
    .join('\n') + '\n\n'
    return title + aLinks;
};
module.exports = createContentList;
