export default function getUniqueBy(array, by) {
    return array.filter((value, index, self) => {
        return self.findIndex(item => by(item) === by(value)) === index;
    });
}
//# sourceMappingURL=getUniqueBy.js.map