const fs = require('fs');

const reactRules = fs.readFileSync('../rules/react.js', 'utf-8');
const createDoc = ({ file = '' } = {}) => {
    const keyMapDocStyle = {
        '@meaning': {
            titleName: '规则含义',
            bodyStyle: 'block',
        },
        '@why': {
            titleName: '规则原因',
            bodyStyle: 'block',
        },
        '@wrong': {
            titleName: '错误例子',
            bodyStyle: 'code',
        },
        '@right': {
            titleName: '正确例子',
            bodyStyle: 'code',
        },
    }
  const title = '# 标题';
  const contentList = [];
  const body = [];
  file.replace(
    /\/\*\*([\s\S]*?)\*\/[\s\n]+'(.*?)':/g,
    (match, doc, ruleName) => {
        contentList.push(ruleName);
        const validLines = doc.split('\n').filter(line => line.trim().startsWith('*'));
        
        let bodyStr = [];
        let currentDocStyle;
        let prevDocStyle;
        validLines.forEach(line => {
            const pureText = line.replace(/^\s+*\s/, '').trim();
            currentDocStyle = Object.keys(keyMapDocStyle).find(key => pureText.startsWith(key))
            if (currentDocStyle && currentDocStyle !== prevDocStyle) {
                function createBlock(bodyStr, docStyle) {
                    if (bodyStr.length === 0 || !docStyle) {
                        return ''
                    }
                    const {titleName, bodyStyle} = docStyle;
                    const title = `- ${titleName}`;
                    const body = bodyStr.map(line => {
                        const preSpace = bodyStyle === 'block' ? ''.repeat(2) : ''.repeat(4)
                        return `${preSpace} ${line}`
                    }).join('\n');
                    return `${title}\n\n${body}\n\n`
                }
                wholeBlock += createBlock(bodyStr, prevDocStyle);
                bodyStr = [];
                prevDocStyle = currentDocStyle;
            } else if (currentDocStyle) {
                bodyStr.push(pureText);
            }
        })
        body.push(wholeBlock);
    },
  );
  function createContentList(content) {
      
      return content.map((ruleName, index) => {
        str += `${index + 1}. [${ruleName}](#${ruleName})`
      }).join('\n')
  }
  return title + createContentList(contentList) + body.join('\n');
};
createDoc({ file: reactRules });
