var objCommon={

  messages :
  {
    contact : {
      'nameIncorrect' : {
        'ru': 'Вы не указали <b>Контактное лицо</b>.',
        'ua': 'Не вказано <b>Контактну особу</b>.'
      },
      'contactIncorrect' : {
        'ru': 'Укажите, пожалуйста, информацию для связи - <b>Телефон / E-mail</b>.',
        'ua': 'Вкажіть, будь ласка, інформацію для зв\'язку - <b>Телефон / E-mail</b>.'
      },
      'messageIncorrect' : {
        'ru': 'Текст сообщения не заполнен.',
        'ua': 'Текст повідомлення не заповнений.'
      },
      'ok' : {
        'ru': 'Ваше сообщение успешно отправлено.<br />В ближайшее время с Вами свяжется менеджер.',
        'ua': 'Ваше повідомлення успішно відправлено. <br /> Найближчим часом з Вами зв\'яжеться менеджер.'
      }
    },
    auth : {
      'loginIncorrect' : {
        'ru' : 'Пользователь или пароль указан неверно.',
        'ua' : 'Користувач або пароль вказан невірно.'
      }
    }
  },

  submitForm : function(jqObj, obj)
  {
    $(jqObj).find('div[msg=true]').removeClass().html('');
    $(jqObj).find('input:visible').removeClass('error');
    $(jqObj).find('select:visible').removeClass('error');
    $(jqObj).find('textarea:visible').removeClass('error');

    if (typeof(obj.beforeSubmitForm) != 'undefined')
      {
        obj.beforeSubmitForm(jqObj);
      }

    $(jqObj).ajaxSubmit({
      dataType: 'json',
      success: function(t) { obj.processResponse(t, jqObj); }
    });

    return;
  },

  processResponse : function(data, params)
  {
    if (data.code == 200)
      {
      }
  },

  reportMessages : function(data, state, params)
  {
    msg='';
    for (i=0;i<data.messages.length;i++)
    {
      msg+=(msg == ''?'':"<br />")+eval('objCommon.messages.'+data.messages[i]+'.'+params.lng);
    }

    if (typeof(data.fields) != 'undefined')
      {
        for (i=0;i<data.fields.length;i++)
        {
          params.form.find('input[name='+data.fields[i]+']:visible').addClass('error');
          params.form.find('select[name='+data.fields[i]+']:visible').addClass('error');
          params.form.find('textarea[name='+data.fields[i]+']:visible').addClass('error');
        }
      }

    params.form.find('div[msg=true]').addClass('msg-'+state).html(msg);
    return;
  }

}

var objAuth={

  processResponse : function(data, params)
  {
    if (data.code == 500)
      {
        objCommon.reportMessages(data, 'error', params);
      }
    if (data.code == 200)
      {
        objCommon.reportMessages(data, 'notice', params);
      }
    return;
  }

};

var objContact={

  processResponse : function(data, params)
  {
    if (data.code == 500)
      {
        objCommon.reportMessages(data, 'error', params);
      }
    if (data.code == 200)
      {
        objCommon.reportMessages(data, 'notice', params);
      }
    return;
  }

};

var gallery={
  items: [],
  item: {},
  img: undefined,
  bg: undefined,

  div: function()
  {
    window.scrollTo(0,0);
    gallery.bg=$('<div>');
    $('body').append(gallery.bg);

    $(gallery.bg).css({
      'top': '0px',
      'left': '0px',
      'width': '100%',
      'height': '100%',
      'position': 'fixed',
      'z-index': '99998',
      'display': 'none',
      'background-color': '#d4d4d4'
    });

    $(gallery.bg).fadeIn('show',function(){
      $(gallery.bg).bind('click', function(){
        gallery.remove();
      });
      $(document).bind('keydown',function(e){
        if(e.which == 27) { gallery.remove(); }
      }); 
    });

    p=gallery.item;
    if (typeof($('#simGallery').attr('id')) == 'undefined')
      {
        div=$('<div id="simGallery">');
        $('body').append(div);

        $(div).css({
          'width': '800px',
          'position': 'absolute',
          'z-index': '99999'
        });

        $(div).css({
          'left': parseInt($(window).width()/2-parseInt($(div).css('width'))/2)+'px',
          'top': '50px'
        });
      }
    else { $('#simGallery').show(); }

    html='<h1><span style="margin:0px 10px;display:block;float:right;cursor:pointer;" onclick="gallery.remove();">закрыть</span>'+p.title+'</h1>';
    for (i=1;i<=p.count;i++)
    {
      html+='<img '+(i==1?'class="active" ':'')+'src="http://static.pm2b.com/img/projects/'+p.id+'/'+i+'-small.jpg" alt="'+i+'" onclick="gallery.show(\''+i+'\');" style="width:100px;height:100px;" />';
    }

    $('#simGallery').html(html);
    gallery.show(1);
    return;
  },
  remove: function()
  {
    $('#simGallery').html('').hide();

    if (typeof($(gallery.img)) != 'undefined')
      { $(gallery.img).remove(); }

    gallery.bg.fadeOut('slow',function(){
      gallery.bg.remove();
    });

    return;
  },
  show: function(i)
  {
    p=gallery.item;
    if (typeof($(gallery.img)) != 'undefined')
      { $(gallery.img).remove(); }

    $('#simGallery').find('img[class=active]').each(function(){
      $(this).removeClass('active');
    });

    $('#simGallery').find('img[src*=/'+i+'-small.]').addClass('active');

    img=$('<img />');
    $('body').append(img);
    gallery.img=img;

    $(img).attr('src', 'http://static.pm2b.com/img/projects/'+p.id+'/'+i+'.jpg');
    $(img).css({
      'position': 'absolute',
      'width': $('#simGallery').css('width'),
      'left': $('#simGallery').position().left,
      'top': $('#simGallery').outerHeight()+$('#simGallery').position().top,
      'border': '5px solid #900',
      'z-index': '99999'
    });

    $(img).bind('click', function(){
      $('#simGallery').find('img[class=active]').each(function(){
        $(this).removeClass('active');
      });
      $(this).remove();
    });

    return
  },
  open: function(id)
  {
    if (typeof($('#'+id).attr('id')) == 'undefined')
      {
        for (i=0;i<gallery.items.length;i++)
        {
          if (gallery.items[i].id != id) { continue; }
          gallery.item=gallery.items[i];
	  gallery.div();
          break;
        }
      }
    return;
  }
};

