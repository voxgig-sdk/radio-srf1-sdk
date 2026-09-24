"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RadioSrf1Error = void 0;
class RadioSrf1Error extends Error {
    isRadioSrf1Error = true;
    sdk = 'RadioSrf1';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.RadioSrf1Error = RadioSrf1Error;
//# sourceMappingURL=RadioSrf1Error.js.map