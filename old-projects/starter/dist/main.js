"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const all_exception_filter_1 = require("./app/core/filters/all-exception.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: '*'
    });
    const config = app.get(config_1.ConfigService);
    app.useGlobalFilters(new all_exception_filter_1.AllExceptionsFilter());
    await app.setGlobalPrefix(config.get('URL_ROOT'));
    await app.listen(config.get('PORT'));
    console.log(`Server is up on ${await app.getUrl()} `);
}
bootstrap()
    .catch(err => {
    console.log(err.message);
});
//# sourceMappingURL=main.js.map