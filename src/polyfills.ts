
export default () => {
    // @ts-ignore
    Date.prototype.toTicks = function () {
        return ((this.getTime() * 10000) + 621355968000000000)
    }
    // @ts-ignore
    Date.fromTicks = function (val: number) {
        return new Date(((val - 621355968000000000) / 10000));
    }
};