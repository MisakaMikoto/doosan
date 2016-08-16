/**
 * Created by MisakaMikoto on 2016. 8. 9..
 */
class CommonRest {
    constructor() {
    }

    callPOST(url) {
        $.ajax({
            url: url,
            type: 'POST',
            data: {
            },
            success:function(data){
            }
        });
    }

    callGET(url) {
        $.ajax({
            url: url,
            data: {
            },
            success:function(data){
            }
        });
    }

}