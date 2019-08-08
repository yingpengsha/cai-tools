export function envToObject(envArr) {
  const target = {};
  envArr.forEach(({ key, value }) => {
    target[key] = value;
  });
  return target;
}

export function commandParse(command, envObj) {
  return command.replace(/\$\{(\w+)\}/g, (matched, key) => envObj[key] || key);
}
