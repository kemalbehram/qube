// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production : false,
  adminurl : "admin",
  BackendHost : "http://localhost:2052/",
  // Googlecaptcha_key : "6LcnX9gZAAAAAPvazhGjL-tqJPxk271UHFe00GV1"
  Googlecaptcha_key:"6LeTnsYbAAAAAM8N9GHlj7PyxfkwURz3IX1zKu7a"
};
console.log(environment.BackendHost)
