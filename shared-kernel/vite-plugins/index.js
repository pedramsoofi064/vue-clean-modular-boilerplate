import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import infraSvgLoader from "../svg-loader";

const kebabCase = (key) => {
  const result = key.replace(/([A-Z])/g, " $1").trim();

  return result.split(" ").join("-").toLowerCase();
};
class PluginBuilder {
  constructor() {
    this.plugins = [];
    this.resolvers = [];
  }

  addAutoImportPlugin() {
    this.plugins.push(
      AutoImport({
        imports: ["vue", "vue-router", "pinia", "vee-validate"],
        dirs: [
          "./shared-kernel/shared/user-interface/composables/*.composable.js",
          "./src/user-interface/*/store/index.js",
          "./shared-kernel/*/user-interface/store/index.js",
          "./shared-kernel/cross-cutting/utils",
          "./shared-kernel/cross-cutting/libs/*/index.js",
        ],
        eslintrc: {
          enabled: true,
        },
      }),
    );
    return this;
  }

  addComponentsPlugin() {
    this.plugins.push(
      Components({
        resolvers: this.resolvers,
        globs: ["./src/user-interface/shared/components/**/*.vue", "./shared-kernel/shared/user-interface/components/**/*.vue"],
        dts: true,
      }),
    );
    return this;
  }

  addSvgLoaderPlugin() {
    this.plugins.push(
      infraSvgLoader({
        ignore: [],
        componentName: "svg-loader",
      }),
    );
    return this;
  }

  addDirectiveResolver(hasResolver) {
    hasResolver &&
      this.resolvers.push({
        type: "directive",
        resolve(name) {
          return {
            name: `v${name}`,
            from: `@shared-kernel/shared/user-interface/directives/v-${kebabCase(name)}.directive.js`,
          };
        },
      });
  }

  build() {
    return this.plugins;
  }
}
class PluginDirector {
  constructor(builder) {
    this.builder = builder;
  }

  make(options) {
    const builder = this.builder;
    const pluginMethods = {
      autoImport: builder.addAutoImportPlugin,
      components: builder.addComponentsPlugin,
      svgLoader: builder.addSvgLoaderPlugin,
    };
    builder.addDirectiveResolver(options.directives);
    for (const [name, method] of Object.entries(pluginMethods)) {
      if (options[name]) {
        method.call(builder, options[name]);
      }
    }

    return builder.build();
  }
}
export default (
  options = {
    autoImport: true,
    components: true,
    svgLoader: true,
    directives: true,
  },
) => {
  const pluginBuilder = new PluginBuilder();
  const pluginDirector = new PluginDirector(pluginBuilder);
  return pluginDirector.make(options);
};
