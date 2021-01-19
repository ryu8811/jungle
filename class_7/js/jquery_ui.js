$(function(){
    $(".input_area input[type='text']").keypress(function(event){ // input에 키가 눌리는 순간 발생하는 이벤트

        if(event.keyCode == 13 && $(this).val().length){ // keyCode13인 enter키가 눌리고 그 순간 입력되는 input 창에 값이 있을 경우 실행 시키는 조건문 (&& = 두 조건이 맞을 때)
            var _val = $(this).val(); // 입력 창의 입력된 input  내용을 담는 변수, 변수 값 가져오기
            var _class = $(this).attr("class"); // 입력 된 input의 class명을 담는 변수(my or your 메세지 확인)
            var _time; // 입력되는 순간의 시간을 담는 변수

            //현재 시간을 구하기
            var _date = new Date(); // Date 객체 = pc의 전체 시간 정보
            var _hh = _date.getHours(); // 시간 정보 중 시간(Hour)만 저장
            var _mm = _date.getMinutes(); // 시간 정보 중 분(Minute)만 저장
            var _apm = "오전"; 
            if(_hh > 12){
                _apm = "오후";
                _hh -= 12;
            }
            _time = _apm+" "+_hh+":"+_mm;

            //말풍선 태그에 변수를 담아서 append로 html에 동적으로 추가
            $(".chat_area").append('<div class="item '+_class+'"><div class="box"><p class="msg">'+_val+'</p><span class="time">'+_time+'</span></div></div>')
        
            //0.01초 딜레이 후 chat_area 맨 끝 item(말풍선)에게 on클래스 추가
            setTimeout(function(){
                $(".chat_area .item").last().addClass("on");
            },10)

            $(this).val(""); // 초기화, value 빈값 만들기

            //채팅창이 맨 밑으로 갈 수 있게 하는 스크롤 이벤트
            var _itemL = $(".chat_area .item").length; // 말풍선의 갯수 
            var _itemH = 0;
            for(var i=0; i<_itemL; i++){ // 반복문 = 각 말풍선의 높이 값을 구해서 _itemH에 더해주는 반복문
                _itemH = _itemH + $(".chat_area .item").eq(i).height() + 15; // 15는 고정값, 말풍선 사이의 마진값
                
            };

            //scrollTop을 통해 스크롤을 맨 밑으로 이동 시키는 애니메이션 적용
            $(".chat_area").stop().animate({
                scrollTop:_itemH
            });
        
        };
    });
});




