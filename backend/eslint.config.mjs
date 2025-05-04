import globals from "globals";
import pluginJs from "@eslint/js";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {languageOptions: {
     globals:{
      ... globals.browser, 
      ... globals.node
     }
    },
    rules:{
      indent: ["error",2],
      semi: ["error","always"],
      node : "true"

    }
  },
  pluginJs.configs.recommended,
];