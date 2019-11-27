const router = require('express').Router();
const Beatmap = require('../classes/Beatmap');
router.post("/api/v2/setBeatmapStatus", async (req, res) => {
    let token = req.body.token || null;
    let beatmapid = req.body.bid || null;
    let setid = req.body.sid || null;
    let rank_status = req.body.status || null;
    if(!token || !beatmapid || setid || rank_status){
        return res.status(400).json({ "ERROR": "NOT_ENGOUNT_ARGUMENTS", "DESCRIPTION": "Did you provided right arguments? or server disabled this feature"});
    }

    let beatmap = new Beatmap.beatmap(beatmapid, false, false, null, "kotypey", "osu!tutorial");
    
})
module.exports = router;