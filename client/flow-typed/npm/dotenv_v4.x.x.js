// flow-typed signature: e55dc2010694f6201f756ac5beba2f80
// flow-typed version: c6154227d1/dotenv_v4.x.x/flow_>=v0.34.x <=v0.103.x

declare module "dotenv" {
  declare type DotenvOptions = {
    encoding?: string,
    path?: string
  };

  declare function config(options?: DotenvOptions): boolean;

  declare module.exports: {
    config: typeof config,
    load: typeof config,
    parse: (src: string | Buffer) => { [string]: string }
  }
}
