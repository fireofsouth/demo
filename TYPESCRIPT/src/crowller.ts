// ts -> .d.ts 翻译文件 @type/** */ -> js
import fs from 'fs';
import path from 'path';
import superagent from 'superagent';
import cheerio from 'cheerio';

interface Course {
    title: string;
    count: number;
}
interface CourseResult {
    time: number;
    data: Course[];
}
interface Content {
    [propName: number]: Course[];
}
class Crowller {
    private secret = 'secretKey';
    private url = `http://www.dell-lee.com/typescript/demo.html?secret=${this.secret}`;
    private filePath = path.resolve(__dirname, '../data/course.json');
    getCourseInfo(html: string) {
        const $ = cheerio.load(html);
        const courseItem = $('.course-item');
        const courseInfos: Course[] = [];
        courseItem.map((index, element) => {
            const descs = $(element).find('.course-desc');
            const title = descs.eq(0).text();
            const count = parseInt(
                descs
                    .eq(1)
                    .text()
                    .split('：')[1]
            );
            courseInfos.push({
                title,
                count,
            });
        });
        return {
            time: new Date().getTime(),
            data: courseInfos,
        };
    }
    async getRawHtml() {
        const result = await superagent.get(this.url);
        return result.text;
    }
    async initSpiderProcess() {
        const html = await this.getRawHtml();
        const courseInfo = this.getCourseInfo(html);
        const fileContent = this.generateJsonContent(courseInfo);
        this.writeFile(JSON.stringify(fileContent));
    }
    writeFile(content: string) {
        fs.writeFileSync(this.filePath, content);
    }
    generateJsonContent(courseInfo: CourseResult) {
        let fileContent: Content = {};
        if (fs.existsSync(this.filePath)) {
            fileContent = JSON.parse(fs.readFileSync(this.filePath, 'utf-8'));
        }
        fileContent[courseInfo.time] = courseInfo.data;
        return fileContent;
    }
    constructor() {
        this.initSpiderProcess();
    }
}
const crowller = new Crowller();
