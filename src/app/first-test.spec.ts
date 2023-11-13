describe('First Test', () => {
    let testVariable: any;

    beforeEach(() => {
        testVariable = {}
    })

    it('should returnt true if as is true', () => {
        //arrange
        testVariable.a = false

        //act
        testVariable.a = true

        //assert
        expect(testVariable.a).toBe(true)

    })
})

// describe('User Service', () => {
//     describe('getUser()', () => {
//         it('Should return the correct given user', () => {

//         })
//     })
// })