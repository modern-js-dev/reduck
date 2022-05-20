import handlebars from 'handlebars';

export function renderString(
  template: string,
  fullData: Record<string, unknown>,
  registers?: {
    helpers: Record<string, handlebars.HelperDelegate>;
    partials: Record<string, handlebars.Template>;
  },
): string {
  const helpers: Record<string, handlebars.HelperDelegate> = {
    ...registers?.helpers,
  };
  const partials: Record<string, handlebars.Template> = {
    ...registers?.partials,
  };
  Object.keys(helpers).forEach(h => handlebars.registerHelper(h, helpers[h]));
  Object.keys(partials).forEach(p =>
    handlebars.registerPartial(p, partials[p]),
  );
  return handlebars.compile(template)(fullData) || '';
}
