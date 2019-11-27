
module.exports = {
    beatmap: class Beatmap{
        /**
         * 
         * @param {*} id Beatmap id
         * @param {*} ranked_status ranked status
         * @param {*} freeze_status if true - ranked only on minase, false = ranked from official server
         * @param {*} beatmapName Name of beatmap
         * @param {*} artist Artist
         * @param {*} diffname Difficulty name
         */
        constructor(id, ranked_status, freeze_status, beatmapName, artist, diffname){
            this.statuses = {
                "UNKNOWN": -2,
                "NOT_SUBMITED": -1,
                "PENDING": 0,
                "NEED_UPDATE": 1,
                "RANKED": 2,
                "APPROVED": 3,
                "QUALIFIED": 4,
                "LOVED": 5
            };
            this.id = id || 0;
            this.ranked_status = ranked_status || this.statuses.UNKNOWN;//Im so lazy
            this.freeze_status = freeze_status || false;
            this.beatmapName = beatmapName || null;
            this.artist = artist || null;
            this.diffname = diffname || null;
        }
    },
    statuses: class statuses{
        constructor(){
            return false;
        };


        static getRankedStatuses() {
            return {
                "UNKNOWN": -2,
                "NOT_SUBMITED": -1,
                "PENDING": 0,
                "NEED_UPDATE": 1,
                "RANKED": 2,
                "APPROVED": 3,
                "QUALIFIED": 4,
                "LOVED": 5
            }
        }
    }
}