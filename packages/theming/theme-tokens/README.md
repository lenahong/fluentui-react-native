# Theme-tokens

Defines values for tokens used to fill out themes, such as color, typography, and spacing values.

These tokens are generated by the token pipeline. The input to the pipeline is defined by the `pipeline-input/token-input.json` file. You can find information on the format of the input on [this page](https://microsoft.github.io/fluentui-token-pipeline/json.html). The output files are generated by running `yarn build-tokens` which generates the output into the `src/reactnative` directory. Please run the pipeline when you change the input file for the changes to appear in the output files. The output format is 3 JSON files which specify the global, alias, and control tokens to use in themes.

In the future the json files will be imported an npm package.
