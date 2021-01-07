$(function(){
    // 자리셋팅 버튼
    $(".btn_setting").click(function(){
        $(".section.box_intro").removeClass("on"); //버튼 제거
        loadDataFn();
    });
    

    var loadData; // ajax로 불러온 json 데이터를 담는 변수

    function loadDataFn(){
        $.ajax({
            url:"js/data.json", // 데이터 경로
            dataType:"json",
            success:function(result){ // 성공했을때의 값을 받을 result라는 임의의 변수
                loadData = result.seatInfo;
                //settingSeatFn();
                console.log(loadData);
            }
        });
    };

    // // 자리 배치
    // function settingSeatFn(){

    // }
})