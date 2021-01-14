$(function(){

    // 변수는 제일 위에 선언(약속)
    var loadData;
    var loadDataLength
    var selectNameArr = []; // 선택된 자리의 이름, 전역변수
    var selectTotal = 0; // 선택된 자리 가격의 총합, 전역변수

    // 자리셋팅 버튼
    $(".btn_setting").click(function(){
        $(".section.box_intro").removeClass("on"); // 첫 화면 숨김 처리
        loadDataFn();
    });

    // 자리배치 완료 버튼
    $(".box_info .btn_submit").click(function(){
        $(".section.reservation").removeClass("on"); // 자리 배치 화면 숨김 처리
        $(".section.complete").addClass("on");
    });

    // 완료화면의 리셋버튼
    $(".btn_reset").click(function(){
        location.reload(); // 첫 화면으로 이동
        //console.log(selectNameArr, selectTotal)
    });
    

    var loadData; // ajax로 불러온 json 데이터를 담는 변수

    // ajax 로드 함수
    function loadDataFn(){
        $.ajax({
            url:"js/data.json", // 데이터 경로
            dataType:"json",
            success:function(result){ // 성공했을때의 값을 받을 result라는 임의의 변수
                loadData = result.seatInfo;
                settingSeatFn();
                // console.log(loadData);
            }
        });
    };

    // 자리 배치
    function settingSeatFn(){
        // colsole.log(loadData.length);
        $(".section.reservation").addClass("on"); // 자리배치 보이기
        loadDataLength = loadData.length;
        for(var i = 0; i<loadDataLength; i++){
            var n = loadData[i].name;
            var p = loadData[i].price;
            var r = loadData[i].reserve;
            // console.log(n,p,r);
            $(".section.reservation > ol").append('<li class="unit"><button data-price="'+p+'" '+r+'>'+n+'</button></li>');


        }

        $(".section.reservation > ol button").click(function(){
            $(this).toggleClass("select"); // toggleClass = on&off
            updateInfo();
        });
    }


    // 자리값 업데이트
    function updateInfo(){
        var selectArr = []; // 배열 초기화 & 정의, 지역변수
        selectNameArr = []; // 선택된 자리의 이름
        selectTotal = 0; // 선택된 자리 가격의 총합
        // 이 구역 안에서만 쓸 수 있는 변수 = 지역변수, 이 변수를 다른 범위 내에서도 쓰고 싶을 경우 전역변수로 변경. 제일 상단에 같이 정의해주면 된다.

        // index값 찾기
        for(var i = 0; i < loadDataLength; i++){
            if($(".section.reservation > ol button").eq(i).hasClass("select") == true){
                selectArr.push(i) // 선택된 자리의 index 값을 배열에 저장
            }
           //console.log(i, $(".section.reservation > ol button").eq(i).hasClass("select")); // 클래스를 갖고 있는지 확인하는 메소드
        }

        // console.log(selectArr); // 배열 전체를 불러온다 

        // 하단 선택 정보 업데이트
        for(var i=0; i<selectArr.length; i++){
            var _i = selectArr[i];
            var _cost;
            //console.log(loadData[_i].name);
            selectNameArr.push(loadData[_i].name);
            _cost = loadData[_i].price;
            selectTotal += Number(_cost); // 문자로 인식되는 변수 _cost를 앞에 Number 를 붙여 숫자로 바꿔줌
            // == selectTotal = Number(_cost) + selectTotal, +=  결과값에 더해줘라
        }
        //console.log(selectNameArr); // 자리 이름 불러오기

        $(".txt_info_name").text(selectNameArr);
        $(".txt_info_total").text(selectTotal);
        //console.log(selectTotal);

        $(".section.complete .txt_name").text(selectNameArr);
        $(".section.complete .txt_price > strong").text(selectTotal);
    }
})