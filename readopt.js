/**
 * Create GNU / POSIX style option reader.
 * @param {string} paramShorts
 * @param {...string} flagLongs
 */
function readopt(paramShorts="", ...flagLongs) {
    return function* readopt(args) {
        while (args.length && args[0][0] === "-") {
            let arg = args.shift();
            let optname = undefined;
            let optval = undefined;

            if (arg === "--") {
                break;
            }

            if (arg.slice(0,2) === "--" && arg.includes("=")) {
                let i = arg.indexOf("=");
                [optname, optval] = [arg.slice(0,i), arg.slice(i+1)];

                if (flagLongs.includes(optname)) {
                    throw new Error(`${optname} option does not accept value`);
                }

                yield [optname, optval];
            } else if (arg.slice(0,2) === "--") {
                if (args.length === 0) {
                    throw new Error(`${arg} expects value`);
                }

                yield flagLongs.includes(arg.slice(2))
                    ? [arg, true]
                    : [arg, args.shift()];
            } else if (arg.length > 1) {
                while (arg.length > 2) {
                    if (paramShorts.includes(arg[1])) {
                        yield [arg.slice(0,2), arg.slice(2)];
                        arg = "";
                    } else {
                        yield [arg.slice(0,2), true];
                        arg = "-" + arg.slice(2);
                    }
                }

                if (arg && paramShorts.includes(arg[1]) && args.length === 0) {
                    throw new Error(`${arg} expects value`);
                } else if (arg && paramShorts.includes(arg[1])) {
                    yield [arg, args.shift()];
                } else if (arg) {
                    yield [arg, true];
                }
            } else {
                break;
            }
        }
    };
}

module.exports = readopt;
