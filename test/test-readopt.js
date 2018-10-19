const expect = require("expect.js");
const readopt = require("../readopt");

describe("readopt()", () => {
    let readopts, argv;

    beforeEach(() => {
        readopts = readopt();
        argv = ["-xf", "--foo", "val", "arg"];
    });

    it("should accept long options with values or short options without", () => {
        const opts = Array.from(readopts(argv));

        expect(opts.length).to.be(3);

        opts.forEach(opt => {
            expect(opt).to.be.an("array");
            expect(opt.length).to.be(2);
        });

        expect(opts[0][0]).to.be("-x");
        expect(opts[1][0]).to.be("-f");
        expect(opts[2][0]).to.be("--foo");

        expect(opts[0][1]).to.be(true);
        expect(opts[1][1]).to.be(true);
        expect(opts[2][1]).to.be("val");

        expect(argv.length).to.be(1);
        expect(argv[0]).to.be("arg");
    });
});

describe("readopt(string, ...string)", () => {
    let readopts, argv;

    beforeEach(() => {
        readopts = readopt("wl", "foo", "bar");
        argv = ["-xw23", "-l", "13", "--foo", "--bar", "arg"];
    });

    it("should bind values to specified short options", () => {
        const opts = Array.from(readopts(argv));

        expect(opts.length).to.be(5);

        expect(opts[0][0]).to.be("-x");
        expect(opts[1][0]).to.be("-w");
        expect(opts[2][0]).to.be("-l");
        expect(opts[3][0]).to.be("--foo");
        expect(opts[4][0]).to.be("--bar");

        expect(opts[0][1]).to.be(true);
        expect(opts[1][1]).to.be("23");
        expect(opts[2][1]).to.be("13");
        expect(opts[3][1]).to.be(true);
        expect(opts[4][1]).to.be(true);

        expect(argv.length).to.be(1);
        expect(argv[0]).to.be("arg");
    });
});
