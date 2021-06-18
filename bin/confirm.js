const inquirer = require('inquirer');

const genId = (function genIdFactory() {
  let id = 0;
  return () => {
    id += 1;
    return id;
  };
})();
const confirm = async (msg, defaultValue = true) => {
  const name = genId();
  const answer = await inquirer.prompt({
    type: 'confirm',
    name,
    message: `是否${msg}?`,
    default: defaultValue,
  });
  return answer[name];
};
exports.confirm = confirm;
