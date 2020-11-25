
module.exports = {
    handleText: (req, res) => {
        console.log(req.body.msgBox);
        res.send(req.body.msgBox);
    }
}