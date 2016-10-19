(function($)
{
    classifyAthletes();
    printAthletesTableFromLocal();
    
    $('#getAthletes').change(function(e)
    {
        if (!window.File || !window.FileReader || !window.FileList || !window.Blob || (typeof(Storage) == "undefined")) 
        {
            alert('The system is not supported in this browser.');
            return;
        }
        var file = $(this)[0];
        file     = file.files[0];

        if(!file)
        {
            console.log('Failed to load file');
        }
        var athletes,r,output,athletesArr;
        athletesArr = [];
        r = new FileReader();
        r.onload = function(e) { 
            athletes = e.target.result.split('\n');
            athletes.forEach(function(item)
            {
                if( item.length > 0 )
                {
                    var athlete;
                    output += '<tr>'; 
                    athlete = item.split(',');
                    athletesArr.push(athlete);
                    athlete.forEach(function(item)
                    {
                        if( item.length > 0 )
                        {
                            output += '<td>';
                            output += item;
                            output += '</td>';
                        }
                    });
                    output += '</tr>';
                    
                }
            });
            $('tbody#allathletes').html(output);
            localStorage.setItem('athletes', JSON.stringify(athletesArr));
        };
        $('#getAthletes').hide();
        $('#messages').html('<span class="alert alert-done"> O arquivo foi importado com exito! </span>');
        r.readAsText(file); 
    });
    
    function printAthletesTableFromLocal()
    {
        var output, lAthletes;
        lAthletes = localStorage.getItem('athletes'); 
        
        if( lAthletes !== null && lAthletes.length > 0 )
        {
            lAthletes = JSON.parse(lAthletes);
            
            lAthletes.forEach(function(item)
            {
                output += '<tr>';
                var athlete = item;
                athlete.forEach(function(item)
                {
                    output += '<td>';
                    output += item;
                    output += '</td>';
                });
                output += '</tr>';
            });
            $('tbody#allathletes').html(output);
        }
    }
    /*
     * revert: true,
     */
    $(".draggable").draggable({
        helper: 'clone'
    });
    $(".droppable").droppable({
        drop: function(event,ui)
        {
            var id = $(ui.draggable).attr('id');
            var athlete = $(ui.draggable).clone();
            $(ui.draggable).remove();
            $(this).append(athlete);
            $('#'+id).draggable(
            {
                 helper: 'clone'       
            });
        }
    });
    /*
         *  Category AA = Athletes up to 13 YO and up to green belt and up to 49 KG.
         *  Category AB = Athletes up to 13 YO and up to green belt and up to 54 KG.
         *  Category AC = Athletes up to 13 YO and up to green belt and up to 59 KG.
         *  Category AD = Athletes up to 13 YO and up to green belt and up to 64 KG.
         *  Category AE = Athletes up to 13 YO and up to green belt and up to 69 KG.
         *  Category AF = Athletes up to 13 YO and up to green belt and up to 74 KG.
         *  Category AG = Athletes up to 13 YO and up to green belt and up over 74 KG.
         *  
         *  Category BA = Athletes between 13 and 17 YO and up to green belt and up to 49 KG.
         *  Category BB = Athletes between 13 and 17 YO and up to green belt and up to 54 KG.
         *  Category BC = Athletes between 13 and 17 YO and up to green belt and up to 59 KG.
         *  Category BD = Athletes between 13 and 17 YO and up to green belt and up to 64 KG.
         *  Category BE = Athletes between 13 and 17 YO and up to green belt and up to 69 KG.
         *  Category BF = Athletes between 13 and 17 YO and up to green belt and up to 74 KG.
         *  Category BG = Athletes between 13 and 17 YO and up to green belt and up over 74 KG.
         *  
         *  Category CA = Athletes up over 17 YO and up to green belt and up to 49 KG.
         *  Category CB = Athletes up over 17 YO and up to green belt and up to 54 KG.
         *  Category CC = Athletes up over 17 YO and up to green belt and up to 59 KG.
         *  Category CD = Athletes up over 17 YO and up to green belt and up to 64 KG.
         *  Category CE = Athletes up over 17 YO and up to green belt and up to 69 KG.
         *  Category CF = Athletes up over 17 YO and up to green belt and up to 74 KG.
         *  Category CG = Athletes up over 17 YO and up to green belt and up over 74 KG.
         *  
         *  Category DA = Athletes up to 13 YO and between blue tags and belts and up to 49 KG.
         *  Category DB = Athletes up to 13 YO and between blue tags and belts and up to 54 KG.
         *  Category DC = Athletes up to 13 YO and between blue tags and belts and up to 59 KG.
         *  Category DD = Athletes up to 13 YO and between blue tags and belts and up to 64 KG.
         *  Category DE = Athletes up to 13 YO and between blue tags and belts and up to 69 KG.
         *  Category DF = Athletes up to 13 YO and between blue tags and belts and up to 74 KG.
         *  Category DG = Athletes up to 13 YO and between blue tags and belts and up over 74 KG.
         *  
         *  Category EA = Athletes between 13 and 17 YO and between blue tags and belts and up to 49 KG.
         *  Category EB = Athletes between 13 and 17 YO and between blue tags and belts and up to 54 KG.
         *  Category EC = Athletes between 13 and 17 YO and between blue tags and belts and up to 59 KG.
         *  Category ED = Athletes between 13 and 17 YO and between blue tags and belts and up to 64 KG.
         *  Category EE = Athletes between 13 and 17 YO and between blue tags and belts and up to 69 KG.
         *  Category EF = Athletes between 13 and 17 YO and between blue tags and belts and up to 74 KG.
         *  Category EG = Athletes between 13 and 17 YO and between blue tags and belts and up over 74 KG.
         *  
         *  Category FA = Athletes up over 17 YO and between blue tags and belts and up to 49 KG.
         *  Category FB = Athletes up over 17 YO and between blue tags and belts and up to 54 KG.
         *  Category FC = Athletes up over 17 YO and between blue tags and belts and up to 59 KG.
         *  Category FD = Athletes up over 17 YO and between blue tags and belts and up to 64 KG.
         *  Category FE = Athletes up over 17 YO and between blue tags and belts up to 69 KG.
         *  Category FF = Athletes up over 17 YO and between blue tags and belts and up to 74 KG.
         *  Category FG = Athletes up over 17 YO and between blue tags and belts and up over 74 KG.
         *  
         *  Category GA = Athletes up to 13 YO and between red and black tags and up to 49 KG.
         *  Category GB = Athletes up to 13 YO and between red and black tags and up to 54 KG.
         *  Category GC = Athletes up to 13 YO and between red and black tags and up to 59 KG.
         *  Category GD = Athletes up to 13 YO and between red and black tags and up to 64 KG.
         *  Category GE = Athletes up to 13 YO and between red and black tags and up to 69 KG.
         *  Category GF = Athletes up to 13 YO and between red and black tags and up to 74 KG.
         *  Category GG = Athletes up to 13 YO and between red and black tags and up over 74 KG.
         *  
         *  Category HA = Athletes between 13 and 17 YO and between red and black tags and up to 49 KG.
         *  Category HB = Athletes between 13 and 17 YO and between red and black tags and up to 54 KG.
         *  Category HC = Athletes between 13 and 17 YO and between red and black tags and up to 59 KG.
         *  Category HD = Athletes between 13 and 17 YO and between red and black tags and up to 64 KG.
         *  Category HE = Athletes between 13 and 17 YO and between red and black tags and up to 69 KG.
         *  Category HF = Athletes between 13 and 17 YO and between red and black tags and up to 74 KG.
         *  Category HG = Athletes between 13 and 17 YO and between red and black tags and up over 74 KG.
         *  
         *  Category IA = Athletes up over 17 YO and between between red and black tags and up to 49 KG.
         *  Category IB = Athletes up over 17 YO and between between red and black tags and up to 54 KG.
         *  Category IC = Athletes up over 17 YO and between between red and black tags and up to 59 KG.
         *  Category ID = Athletes up over 17 YO and between between red and black tags and up to 64 KG.
         *  Category IE = Athletes up over 17 YO and between between red and black tags up to 69 KG.
         *  Category IF = Athletes up over 17 YO and between between red and black tags and up to 74 KG.
         *  Category IG = Athletes up over 17 YO and between between red and black tags and up over 74 KG.
         *  
         *  Category JA = Athletes up to 13 YO and black belt and up to 49 KG.
         *  Category JB = Athletes up to 13 YO and black belt and up to 54 KG.
         *  Category JC = Athletes up to 13 YO and black belt and up to 59 KG.
         *  Category JD = Athletes up to 13 YO and black belt and up to 64 KG.
         *  Category JE = Athletes up to 13 YO and black belt and up to 69 KG.
         *  Category JF = Athletes up to 13 YO and black belt and up to 74 KG.
         *  Category JG = Athletes up to 13 YO and black belt and up over 74 KG.
         *  
         *  Category LA = Athletes between 13 and 17 YO and black belt and up to 49 KG.
         *  Category LB = Athletes between 13 and 17 YO and black belt and up to 54 KG.
         *  Category LC = Athletes between 13 and 17 YO and black belt and up to 59 KG.
         *  Category LD = Athletes between 13 and 17 YO and black belt and up to 64 KG.
         *  Category LE = Athletes between 13 and 17 YO and black belt and up to 69 KG.
         *  Category LF = Athletes between 13 and 17 YO and black belt and up to 74 KG.
         *  Category LG = Athletes between 13 and 17 YO and black belt and up over 74 KG.
         *  
         *  Category KA = Athletes up over 17 YO and black belt and up to 49 KG.
         *  Category KB = Athletes up over 17 YO and black belt and up to 54 KG.
         *  Category KC = Athletes up over 17 YO and black belt and up to 59 KG.
         *  Category KD = Athletes up over 17 YO and black belt and up to 64 KG.
         *  Category KE = Athletes up over 17 YO and black belt and up to 69 KG.
         *  Category KF = Athletes up over 17 YO and black belt and up to 74 KG.
         *  Category KG = Athletes up over 17 YO and black belt and up over 74 KG.
         */
    function classifyAthletes()
    {
        var lAthletes;
        
        var years = [ 13, 17 ];
        var belts = ['branca','amarela', 'amarela ponta verde', 'verde', 
            'verde ponta azul','azul', 'azul ponta vermelha', 'vermelha', 
            'vermelha ponta preta', 'preta'
        ];
        var category = ['luta', 'poomse', 'luta/poomse'];
        var weights = [ 49, 54, 59, 64, 69, 74];
        
        var data    = {};
        
        data.aa = []; data.ab = []; data.ac = []; data.ad = []; data.ae = [];
        data.af = []; data.ag = [];
        
        data.bb= [];
        data.bc = [];
        data.bd = [];
        data.be = [];
        data.bf = []; 
        data.bg = []; 
        data.ca = []; 
        data.cb = [];
        data.cc = []; 
        data.cd = [];
        data.ce = [];
        data.cf = [];
        data.cg = [];
        data.da = [];
        data.db = [];
        data.dc = [];
        data.dd = [];
        data.de = []; 
        data.df = [];
        data.dg = [];
        data.ea = []; 
        data.eb = []; 
        data.ec = []; 
        data.ed = [];
        data.ef = []; 
        data.eg = []; 
        data.fa = []; 
        data.fb = []; 
        data.fc = []; 
        data.fd = []; 
        data.fe = []; 
        data.ff = [];
        data.fg = []; 
        data.ga = []; 
        data.gb = []; 
        data.gc = []; 
        data.gd = []; 
        data.ge = []; 
        data.gf = []; 
        data.gg = [];
        data.ha = []; 
        data.hb = []; 
        data.hc = []; 
        data.hd = []; 
        data.he = []; 
        data.hf = []; 
        data.hg = []; 
        data.ia = [];
        data.ib = []; 
        data.ic = []; 
        data.id = [];
        data.ie = []; 
        data.if = []; 
        data.ig = []; 
        data.ja = []; 
        data.jb = []; 
        data.jc = []; 
        data.jd = []; 
        data.je = []; 
        data.jf = []; 
        data.jg = []; 
        data.la = []; 
        data.lb = []; 
        data.lc = []; 
        data.ld = []; 
        data.le = []; 
        data.lf = []; 
        data.lg = []; 
        data.ka = []; 
        data.kb = []; 
        data.kc = []; 
        data.kd = []; 
        data.ke = []; 
        data.kf = []; 
        data.kg = []; 
        
        lAthletes = localStorage.getItem('athletes'); 
        
        if( lAthletes !== null && lAthletes.length > 0 )
        {
            lAthletes = JSON.parse(lAthletes);

            lAthletes.forEach(function(item)
            {
                if( parseInt(item[2]) <= years[0] && parseFloat(item[3]) < weights[0] &&
                item[4].toLowerCase() === category[0] &&   
                    (
                    item[1].toLowerCase() === belts[0] ||
                    item[1].toLowerCase() === belts[1] ||
                    item[1].toLowerCase() === belts[2] ||
                    item[1].toLowerCase() === belts[4]
                )){ data.aa.push(item); }
                else if( parseInt(item[2]) <= years[0] && parseFloat(item[3]) < weights[1] &&
                item[4].toLowerCase() === category[0] &&
                (
                    item[1].toLowerCase() === belts[0] ||
                    item[1].toLowerCase() === belts[1] ||
                    item[1].toLowerCase() === belts[2] ||
                    item[1].toLowerCase() === belts[4]
                )){ data.ab.push(item); }
                else if( parseInt(item[2]) <= years[0] && parseFloat(item[3]) < weights[2] &&
                item[4].toLowerCase() === category[0] &&
                (
                    item[1].toLowerCase() === belts[0] ||
                    item[1].toLowerCase() === belts[1] ||
                    item[1].toLowerCase() === belts[2] ||
                    item[1].toLowerCase() === belts[4]   
                )){ data.ac.push(item); }
                else if( parseInt(item[2]) <= years[0] && parseFloat(item[3]) < weights[3] &&
                item[4].toLowerCase() === category[0] &&
                (
                    item[1].toLowerCase() === belts[0] ||
                    item[1].toLowerCase() === belts[1] ||
                    item[1].toLowerCase() === belts[2] ||
                    item[1].toLowerCase() === belts[4]    
                )){ data.ad.push(item); }
                else if( parseInt(item[2]) <= years[0] && parseFloat(item[3]) < weights[4] &&
                item[4].toLowerCase() === category[0] &&
                (
                    item[1].toLowerCase() === belts[0] ||
                    item[1].toLowerCase() === belts[1] ||
                    item[1].toLowerCase() === belts[2] ||
                    item[1].toLowerCase() === belts[4]    
                )){ data.ae.push(item); }                
                else if( parseInt(item[2]) <= years[0] && parseFloat(item[3]) < weights[5] &&
                (
                    item[1].toLowerCase() === belts[0] ||
                    item[1].toLowerCase() === belts[1] ||
                    item[1].toLowerCase() === belts[2] ||
                    item[1].toLowerCase() === belts[4]   
                )){ data.af.push(item); }
                else if( parseInt(item[2]) <= years[0] && parseFloat(item[3]) < weights[6] &&
                item[4].toLowerCase() === category[0] &&
                (
                    item[1].toLowerCase() === belts[0] ||
                    item[1].toLowerCase() === belts[1] ||
                    item[1].toLowerCase() === belts[2] ||
                    item[1].toLowerCase() === belts[4]   
                )){ data.ag.push(item); }
                // 13 - 17
                else if( (parseInt(item[2]) > years[0] && parseInt(item[2]) <= years[1]) && parseFloat(item[3]) < weights[0] &&
                item[4].toLowerCase() === category[0] &&   
                (
                    item[1].toLowerCase() === belts[0] ||
                    item[1].toLowerCase() === belts[1] ||
                    item[1].toLowerCase() === belts[2] ||
                    item[1].toLowerCase() === belts[4]
                )){ data.ba.push(item); }
                
                else if( (parseInt(item[2]) > years[0] && parseInt(item[2]) <= years[1]) && parseFloat(item[3]) < weights[1] &&
                item[4].toLowerCase() === category[0] &&
                (
                    item[1].toLowerCase() === belts[0] ||
                    item[1].toLowerCase() === belts[1] ||
                    item[1].toLowerCase() === belts[2] ||
                    item[1].toLowerCase() === belts[4]
                )){ data.bb.push(item); }
                else if( (parseInt(item[2]) > years[0] && parseInt(item[2]) <= years[1]) && parseFloat(item[3]) < weights[2] &&
                item[4].toLowerCase() === category[0] &&
                (
                    item[1].toLowerCase() === belts[0] ||
                    item[1].toLowerCase() === belts[1] ||
                    item[1].toLowerCase() === belts[2] ||
                    item[1].toLowerCase() === belts[4]   
                )){ data.bc.push(item); }
                else if( (parseInt(item[2]) > years[0] && parseInt(item[2]) <= years[1]) && parseFloat(item[3]) < weights[3] &&
                item[4].toLowerCase() === category[0] &&
                (
                    item[1].toLowerCase() === belts[0] ||
                    item[1].toLowerCase() === belts[1] ||
                    item[1].toLowerCase() === belts[2] ||
                    item[1].toLowerCase() === belts[4]    
                )){ data.bd.push(item); }
                else if( (parseInt(item[2]) > years[0] && parseInt(item[2]) <= years[1]) && parseFloat(item[3]) < weights[4] &&
                item[4].toLowerCase() === category[0] &&
                (
                    item[1].toLowerCase() === belts[0] ||
                    item[1].toLowerCase() === belts[1] ||
                    item[1].toLowerCase() === belts[2] ||
                    item[1].toLowerCase() === belts[4]    
                )){ data.be.push(item); }                
                else if( (parseInt(item[2]) > years[0] && parseInt(item[2]) <= years[1]) && parseFloat(item[3]) < weights[5] &&
                item[4].toLowerCase() === category[0] &&
                (
                    item[1].toLowerCase() === belts[0] ||
                    item[1].toLowerCase() === belts[1] ||
                    item[1].toLowerCase() === belts[2] ||
                    item[1].toLowerCase() === belts[4]   
                )){ data.bf.push(item); }
                else if( (parseInt(item[2]) > years[0] && parseInt(item[2]) <= years[1]) && parseFloat(item[3]) < weights[6] &&
                item[4].toLowerCase() === category[0] &&
                (
                    item[1].toLowerCase() === belts[0] ||
                    item[1].toLowerCase() === belts[1] ||
                    item[1].toLowerCase() === belts[2] ||
                    item[1].toLowerCase() === belts[4]   
                )){ data.bg.push(item); }
                // > 17
                else if( parseInt(item[2]) > years[1] && parseFloat(item[3]) < weights[0] &&
                item[4].toLowerCase() === category[0] &&   
                (
                    item[1].toLowerCase() === belts[0] ||
                    item[1].toLowerCase() === belts[1] ||
                    item[1].toLowerCase() === belts[2] ||
                    item[1].toLowerCase() === belts[4]
                )){ data.ca.push(item); }
                else if( parseInt(item[2]) > years[1] && parseFloat(item[3]) < weights[1] &&
                item[4].toLowerCase() === category[0] &&
                (
                    item[1].toLowerCase() === belts[0] ||
                    item[1].toLowerCase() === belts[1] ||
                    item[1].toLowerCase() === belts[2] ||
                    item[1].toLowerCase() === belts[4]
                )){ data.cb.push(item); }
                else if( parseInt(item[2]) > years[1] && parseFloat(item[3]) < weights[2] &&
                item[4].toLowerCase() === category[0] &&
                (
                    item[1].toLowerCase() === belts[0] ||
                    item[1].toLowerCase() === belts[1] ||
                    item[1].toLowerCase() === belts[2] ||
                    item[1].toLowerCase() === belts[4]   
                )){ data.cc.push(item); }
                else if( parseInt(item[2]) > years[1] && parseFloat(item[3]) < weights[3] &&
                item[4].toLowerCase() === category[0] &&
                (
                    item[1].toLowerCase() === belts[0] ||
                    item[1].toLowerCase() === belts[1] ||
                    item[1].toLowerCase() === belts[2] ||
                    item[1].toLowerCase() === belts[4]    
                )){ data.cd.push(item); }
                else if( parseInt(item[2]) > years[1] && parseFloat(item[3]) < weights[4] &&
                item[4].toLowerCase() === category[0] &&
                (
                    item[1].toLowerCase() === belts[0] ||
                    item[1].toLowerCase() === belts[1] ||
                    item[1].toLowerCase() === belts[2] ||
                    item[1].toLowerCase() === belts[4]    
                )){ data.ce.push(item); }                
                else if( parseInt(item[2]) > years[1] && parseFloat(item[3]) < weights[5] &&
                item[4].toLowerCase() === category[0] &&
                (
                    item[1].toLowerCase() === belts[0] ||
                    item[1].toLowerCase() === belts[1] ||
                    item[1].toLowerCase() === belts[2] ||
                    item[1].toLowerCase() === belts[4]   
                )){ data.cf.push(item); }
                else if( parseInt(item[2]) > years[1] && parseFloat(item[3]) < weights[6] &&
                item[4].toLowerCase() === category[0] &&
                (
                    item[1].toLowerCase() === belts[0] ||
                    item[1].toLowerCase() === belts[1] ||
                    item[1].toLowerCase() === belts[2] ||
                    item[1].toLowerCase() === belts[4]   
                )){ data.cg.push(item); }
                // blue tag to blue
                else if( parseInt(item[2]) <= years[0] && parseFloat(item[3]) < weights[0] &&
                item[4].toLowerCase() === category[0] &&
                (
                    item[1].toLowerCase() === belts[5] ||
                    item[1].toLowerCase() === belts[6]  
                )){ data.da.push(item); }
                else if( parseInt(item[2]) <= years[0] && parseFloat(item[3]) < weights[1] &&
                (
                    item[1].toLowerCase() === belts[5] ||
                    item[1].toLowerCase() === belts[6]   
                )){ data.db.push(item); }
                else if( parseInt(item[2]) <= years[0] && parseFloat(item[3]) < weights[2] &&
                item[4].toLowerCase() === category[0] &&
                (
                    item[1].toLowerCase() === belts[5] ||
                    item[1].toLowerCase() === belts[6]   
                )){ data.dc.push(item); }
                else if( parseInt(item[2]) <= years[0] && parseFloat(item[3]) < weights[3] &&
                item[4].toLowerCase() === category[0] &&
                (
                    item[1].toLowerCase() === belts[5] ||
                    item[1].toLowerCase() === belts[6]    
                )){ data.dd.push(item); }
                else if( parseInt(item[2]) <= years[0] && parseFloat(item[3]) < weights[4] &&
                item[4].toLowerCase() === category[0] &&
                (
                    item[1].toLowerCase() === belts[5] ||
                    item[1].toLowerCase() === belts[6]   
                )){ data.de.push(item); }                
                else if( parseInt(item[2]) <= years[0] && parseFloat(item[3]) < weights[5] &&
                item[4].toLowerCase() === category[0] &&
                (
                    item[1].toLowerCase() === belts[5] ||
                    item[1].toLowerCase() === belts[6]    
                )){ data.df.push(item); }
                else if( parseInt(item[2]) <= years[0] && parseFloat(item[3]) < weights[6] &&
                item[4].toLowerCase() === category[0] &&
                (
                    item[1].toLowerCase() === belts[5] ||
                    item[1].toLowerCase() === belts[6]   
                )){ data.dg.push(item); }
                // 13 - 17 
                else if( (parseInt(item[2]) > years[0] && parseInt(item[2]) <= years[1]) && parseFloat(item[3]) < weights[0] &&
                item[4].toLowerCase() === category[0] &&
                (
                    item[1].toLowerCase() === belts[5] ||
                    item[1].toLowerCase() === belts[6]  
                )){ data.ea.push(item); }
                else if( (parseInt(item[2]) > years[0] && parseInt(item[2]) <= years[1]) && parseFloat(item[3]) < weights[1] &&
                (
                    item[1].toLowerCase() === belts[5] ||
                    item[1].toLowerCase() === belts[6]   
                )){ data.eb.push(item); }
                else if( (parseInt(item[2]) > years[0] && parseInt(item[2]) <= years[1]) && parseFloat(item[3]) < weights[2] &&
                item[4].toLowerCase() === category[0] &&
                (
                    item[1].toLowerCase() === belts[5] ||
                    item[1].toLowerCase() === belts[6]   
                )){ data.ec.push(item); }
                else if( (parseInt(item[2]) > years[0] && parseInt(item[2]) <= years[1]) && parseFloat(item[3]) < weights[3] &&
                item[4].toLowerCase() === category[0] &&
                (
                    item[1].toLowerCase() === belts[5] ||
                    item[1].toLowerCase() === belts[6]    
                )){ data.ed.push(item); }
                else if( (parseInt(item[2]) > years[0] && parseInt(item[2]) <= years[1]) && parseFloat(item[3]) < weights[4] &&
                item[4].toLowerCase() === category[0] &&
                (
                    item[1].toLowerCase() === belts[5] ||
                    item[1].toLowerCase() === belts[6]   
                )){ data.ee.push(item);  }               
                else if( (parseInt(item[2]) > years[0] && parseInt(item[2]) <= years[1]) && parseFloat(item[3]) < weights[5] &&
                item[4].toLowerCase() === category[0] &&
                (
                    item[1].toLowerCase() === belts[5] ||
                    item[1].toLowerCase() === belts[6]    
                )){ data.ef.push(item); }
                else if( (parseInt(item[2]) > years[0] && parseInt(item[2]) <= years[1]) && parseFloat(item[3]) < weights[6] &&
                item[4].toLowerCase() === category[0] &&
                (
                    item[1].toLowerCase() === belts[5] ||
                    item[1].toLowerCase() === belts[6]   
                )){ data.eg.push(item); }
                // > 17
                else if( parseInt(item[2]) > years[1] && parseFloat(item[3]) < weights[0] &&
                item[4].toLowerCase() === category[0] &&
                (
                    item[1].toLowerCase() === belts[5] ||
                    item[1].toLowerCase() === belts[6]  
                )){ data.fa.push(item); }
                else if( parseInt(item[2]) > years[1] && parseFloat(item[3]) < weights[1] &&
                item[4].toLowerCase() === category[0] &&
                (
                    item[1].toLowerCase() === belts[5] ||
                    item[1].toLowerCase() === belts[6]   
                )){ data.fb.push(item); }
                else if( parseInt(item[2]) > years[1] && parseFloat(item[3]) < weights[2] &&
                item[4].toLowerCase() === category[0] &&
                (
                    item[1].toLowerCase() === belts[5] ||
                    item[1].toLowerCase() === belts[6]   
                )){ data.fc.push(item); }
                else if( parseInt(item[2]) > years[1] && parseFloat(item[3]) < weights[3] &&
                item[4].toLowerCase() === category[0] &&
                (
                    item[1].toLowerCase() === belts[5] ||
                    item[1].toLowerCase() === belts[6]    
                )){ data.fd.push(item); }
                else if( parseInt(item[2]) > years[1] && parseFloat(item[3]) < weights[4] &&
                item[4].toLowerCase() === category[0] &&
                (
                    item[1].toLowerCase() === belts[5] ||
                    item[1].toLowerCase() === belts[6]   
                )){ data.fe.push(item); }                
                else if( parseInt(item[2]) > years[1] && parseFloat(item[3]) < weights[5] &&
                item[4].toLowerCase() === category[0] &&
                (
                    item[1].toLowerCase() === belts[5] ||
                    item[1].toLowerCase() === belts[6]    
                )){ data.ff.push(item); }
                else if( parseInt(item[2]) > years[1] && parseFloat(item[3]) < weights[6] &&
                item[4].toLowerCase() === category[0] &&
                (
                    item[1].toLowerCase() === belts[5] ||
                    item[1].toLowerCase() === belts[6]   
                )){ data.fg.push(item); }
                // red tag to black tag 
                else if( parseInt(item[2]) <= years[0] && parseFloat(item[3]) < weights[0] &&
                item[4].toLowerCase() === category[0] &&
                (
                    item[1].toLowerCase() === belts[7] ||
                    item[1].toLowerCase() === belts[8] ||
                    item[1].toLowerCase() === belts[9]    
                )){ data.ga.push(item); }
                else if( parseInt(item[2]) <= years[0] && parseFloat(item[3]) < weights[1] &&
                item[4].toLowerCase() === category[0] &&
                (
                    item[1].toLowerCase() === belts[7] ||
                    item[1].toLowerCase() === belts[8] ||
                    item[1].toLowerCase() === belts[9]    
                )){ data.gb.push(item); }
                else if( parseInt(item[2]) <= years[0] && parseFloat(item[3]) < weights[2] &&
                item[4].toLowerCase() === category[0] &&
                (
                    item[1].toLowerCase() === belts[7] ||
                    item[1].toLowerCase() === belts[8] ||
                    item[1].toLowerCase() === belts[9]    
                )){ data.gc.push(item); }
                else if( parseInt(item[2]) <= years[0] && parseFloat(item[3]) < weights[3] &&
                item[4].toLowerCase() === category[0] &&
                (
                    item[1].toLowerCase() === belts[7] ||
                    item[1].toLowerCase() === belts[8] ||
                    item[1].toLowerCase() === belts[9]    
                )){ data.gd.push(item); }
                else if( parseInt(item[2]) <= years[0] && parseFloat(item[3]) < weights[4] &&
                item[4].toLowerCase() === category[0] &&
                (
                    item[1].toLowerCase() === belts[7] ||
                    item[1].toLowerCase() === belts[8] ||
                    item[1].toLowerCase() === belts[9]    
                )){ data.ge.push(item); }
                else if( parseInt(item[2]) <= years[0] && parseFloat(item[3]) < weights[5] &&
                item[4].toLowerCase() === category[0] &&
                (
                    item[1].toLowerCase() === belts[7] ||
                    item[1].toLowerCase() === belts[8] ||
                    item[1].toLowerCase() === belts[9]    
                )){ data.gf.push(item); }
                else if( parseInt(item[2]) <= years[0] && parseFloat(item[3]) < weights[6] &&
                item[4].toLowerCase() === category[0] &&
                (
                    item[1].toLowerCase() === belts[7] ||
                    item[1].toLowerCase() === belts[8] ||
                    item[1].toLowerCase() === belts[9]   
                )){ data.gg.push(item); }
                // 13 - 17
                else if( (parseInt(item[2]) > years[0] && parseInt(item[2]) <= years[1]) && parseFloat(item[3]) < weights[0] &&
                item[4].toLowerCase() === category[0] &&
                (
                    item[1].toLowerCase() === belts[7] ||
                    item[1].toLowerCase() === belts[8] ||
                    item[1].toLowerCase() === belts[9]    
                )){ data.ha.push(item); }
                else if( (parseInt(item[2]) > years[0] && parseInt(item[2]) <= years[1]) && parseFloat(item[3]) < weights[1] &&
                item[4].toLowerCase() === category[0] &&
                (
                    item[1].toLowerCase() === belts[7] ||
                    item[1].toLowerCase() === belts[8] ||
                    item[1].toLowerCase() === belts[9]    
                )){ data.hb.push(item); }
                else if( (parseInt(item[2]) > years[0] && parseInt(item[2]) <= years[1]) && parseFloat(item[3]) < weights[2] &&
                item[4].toLowerCase() === category[0] &&
                (
                    item[1].toLowerCase() === belts[7] ||
                    item[1].toLowerCase() === belts[8] ||
                    item[1].toLowerCase() === belts[9]    
                )){ data.hc.push(item); }
                else if( (parseInt(item[2]) > years[0] && parseInt(item[2]) <= years[1]) && parseFloat(item[3]) < weights[3] &&
                item[4].toLowerCase() === category[0] &&
                (
                    item[1].toLowerCase() === belts[7] ||
                    item[1].toLowerCase() === belts[8] ||
                    item[1].toLowerCase() === belts[9]    
                )){ data.hd.push(item); }
                else if( (parseInt(item[2]) > years[0] && parseInt(item[2]) <= years[1]) && parseFloat(item[3]) < weights[4] &&
                item[4].toLowerCase() === category[0] &&
                (
                    item[1].toLowerCase() === belts[7] ||
                    item[1].toLowerCase() === belts[8] ||
                    item[1].toLowerCase() === belts[9]    
                )){ data.he.push(item); }
                else if( (parseInt(item[2]) > years[0] && parseInt(item[2]) <= years[1]) && parseFloat(item[3]) < weights[5] &&
                item[4].toLowerCase() === category[0] &&
                (
                    item[1].toLowerCase() === belts[7] ||
                    item[1].toLowerCase() === belts[8] ||
                    item[1].toLowerCase() === belts[9]    
                )){ data.hf.push(item); }
                else if( (parseInt(item[2]) > years[0] && parseInt(item[2]) <= years[1]) && parseFloat(item[3]) < weights[6] &&
                item[4].toLowerCase() === category[0] &&
                (
                    item[1].toLowerCase() === belts[7] ||
                    item[1].toLowerCase() === belts[8] ||
                    item[1].toLowerCase() === belts[9]   
                )){ data.hg.push(item); }
                //  > 17
                else if( parseInt(item[2]) > years[1] && parseFloat(item[3]) < weights[0] &&
                item[4].toLowerCase() === category[0] &&
                (
                    item[1].toLowerCase() === belts[7] ||
                    item[1].toLowerCase() === belts[8] ||
                    item[1].toLowerCase() === belts[9]    
                )){ data.ia.push(item); }
                else if( parseInt(item[2]) > years[1] && parseFloat(item[3]) < weights[1] &&
                item[4].toLowerCase() === category[0] &&
                (
                    item[1].toLowerCase() === belts[7] ||
                    item[1].toLowerCase() === belts[8] ||
                    item[1].toLowerCase() === belts[9]    
                )){ data.ib.push(item); }
                else if( parseInt(item[2]) > years[1] && parseFloat(item[3]) < weights[2] &&
                item[4].toLowerCase() === category[0] &&
                (
                    item[1].toLowerCase() === belts[7] ||
                    item[1].toLowerCase() === belts[8] ||
                    item[1].toLowerCase() === belts[9]    
                )){ data.ic.push(item); }
                else if( parseInt(item[2]) > years[1] && parseFloat(item[3]) < weights[3] &&
                item[4].toLowerCase() === category[0] &&
                (
                    item[1].toLowerCase() === belts[7] ||
                    item[1].toLowerCase() === belts[8] ||
                    item[1].toLowerCase() === belts[9]    
                )){ data.id.push(item); }
                else if( parseInt(item[2]) > years[1] && parseFloat(item[3]) < weights[4] &&
                item[4].toLowerCase() === category[0] &&
                (
                    item[1].toLowerCase() === belts[7] ||
                    item[1].toLowerCase() === belts[8] ||
                    item[1].toLowerCase() === belts[9]    
                )){ data.ie.push(item); }
                else if( parseInt(item[2]) > years[1] && parseFloat(item[3]) < weights[5] &&
                item[4].toLowerCase() === category[0] &&
                (
                    item[1].toLowerCase() === belts[7] ||
                    item[1].toLowerCase() === belts[8] ||
                    item[1].toLowerCase() === belts[9]    
                )){ data.if.push(item); }
                // black
                else if( parseInt(item[2]) <= years[0] && parseFloat(item[3]) < weights[0] &&
                item[4].toLowerCase() === category[0] &&
                (
                    item[1].toLowerCase() === belts[7] ||
                    item[1].toLowerCase() === belts[8] ||
                    item[1].toLowerCase() === belts[9]    
                )){ data.ja.push(item); }
                else if( parseInt(item[2]) <= years[0] && parseFloat(item[3]) < weights[1] &&
                item[4].toLowerCase() === category[0] &&
                (
                    item[1].toLowerCase() === belts[7] ||
                    item[1].toLowerCase() === belts[8] ||
                    item[1].toLowerCase() === belts[9]    
                )){ data.jb.push(item); }
                else if( parseInt(item[2]) <= years[0] && parseFloat(item[3]) < weights[2] &&
                item[4].toLowerCase() === category[0] &&
                (
                    item[1].toLowerCase() === belts[7] ||
                    item[1].toLowerCase() === belts[8] ||
                    item[1].toLowerCase() === belts[9]    
                )){ data.jc.push(item); }
                else if( parseInt(item[2]) <= years[0] && parseFloat(item[3]) < weights[3] &&
                item[4].toLowerCase() === category[0] &&
                (
                    item[1].toLowerCase() === belts[7] ||
                    item[1].toLowerCase() === belts[8] ||
                    item[1].toLowerCase() === belts[9]    
                )){ data.jd.push(item); }
                else if( parseInt(item[2]) <= years[0] && parseFloat(item[3]) < weights[4] &&
                item[4].toLowerCase() === category[0] &&
                (
                    item[1].toLowerCase() === belts[7] ||
                    item[1].toLowerCase() === belts[8] ||
                    item[1].toLowerCase() === belts[9]    
                )){ data.je.push(item); }
                else if( parseInt(item[2]) <= years[0] && parseFloat(item[3]) < weights[5] &&
                item[4] === category[0] &&
                (
                    item[1].toLowerCase() === belts[7] ||
                    item[1].toLowerCase() === belts[8] ||
                    item[1].toLowerCase() === belts[9]    
                )){ data.jf.push(item); }
                else if( parseInt(item[2]) <= years[0] && parseFloat(item[3]) < weights[6] &&
                item[4].toLowerCase() === category[0] &&
                (
                    item[1].toLowerCase() === belts[7] ||
                    item[1].toLowerCase() === belts[8] ||
                    item[1].toLowerCase() === belts[9]   
                )){ data.jg.push(item); }
                // 13 - 17
                else if( (parseInt(item[2]) > years[0] && parseInt(item[2]) <= years[1]) && parseFloat(item[3]) < weights[0] &&
                item[4].toLowerCase() === category[0] &&
                (
                    item[1].toLowerCase() === belts[7] ||
                    item[1].toLowerCase() === belts[8] ||
                    item[1].toLowerCase() === belts[9]    
                )){ data.la.push(item); }
                else if( (parseInt(item[2]) > years[0] && parseInt(item[2]) <= years[1]) && parseFloat(item[3]) < weights[1] &&
                item[4].toLowerCase() === category[0] &&
                (
                    item[1].toLowerCase() === belts[7] ||
                    item[1].toLowerCase() === belts[8] ||
                    item[1].toLowerCase() === belts[9]    
                )){ data.lb.push(item); }
                else if( (parseInt(item[2]) > years[0] && parseInt(item[2]) <= years[1]) && parseFloat(item[3]) < weights[2] &&
                item[4].toLowerCase() === category[0] &&
                (
                    item[1].toLowerCase() === belts[7] ||
                    item[1].toLowerCase() === belts[8] ||
                    item[1].toLowerCase() === belts[9]    
                )){ data.lc.push(item); }
                else if( (parseInt(item[2]) > years[0] && parseInt(item[2]) <= years[1]) && parseFloat(item[3]) < weights[3] &&
                item[4].toLowerCase() === category[0] &&
                (
                    item[1].toLowerCase() === belts[7] ||
                    item[1].toLowerCase() === belts[8] ||
                    item[1].toLowerCase() === belts[9]    
                )){ data.ld.push(item); }
                else if( (parseInt(item[2]) > years[0] && parseInt(item[2]) <= years[1]) && parseFloat(item[3]) < weights[4] &&
                item[4].toLowerCase() === category[0] &&
                (
                    item[1].toLowerCase() === belts[7] ||
                    item[1].toLowerCase() === belts[8] ||
                    item[1].toLowerCase() === belts[9]    
                )){ data.le.push(item); }
                else if( (parseInt(item[2]) > years[0] && parseInt(item[2]) <= years[1]) && parseFloat(item[3]) < weights[5] &&
                item[4].toLowerCase() === category[0] &&
                (
                    item[1].toLowerCase() === belts[7] ||
                    item[1].toLowerCase() === belts[8] ||
                    item[1].toLowerCase() === belts[9]    
                )){ data.lf.push(item); }
                else if( (parseInt(item[2]) > years[0] && parseInt(item[2]) <= years[1]) && parseFloat(item[3]) < weights[6] &&
                item[4].toLowerCase() === category[0] &&
                (
                    item[1].toLowerCase() === belts[7] ||
                    item[1].toLowerCase() === belts[8] ||
                    item[1].toLowerCase() === belts[9]   
                )){ data.lg.push(item); }
                else if( (parseInt(item[2]) > years[0] && parseInt(item[2]) <= years[1]) && parseFloat(item[3]) < weights[0] &&
                item[4].toLowerCase() === category[0] &&
                (
                    item[1].toLowerCase() === belts[7] ||
                    item[1].toLowerCase() === belts[8] ||
                    item[1].toLowerCase() === belts[9]    
                )){ data.la.push(item); }
                else if( (parseInt(item[2]) > years[0] && parseInt(item[2]) <= years[1]) && parseFloat(item[3]) < weights[1] &&
                item[4].toLowerCase() === category[0] &&
                (
                    item[1].toLowerCase() === belts[7] ||
                    item[1].toLowerCase() === belts[8] ||
                    item[1].toLowerCase() === belts[9]    
                )){ data.lb.push(item); }
                else if( (parseInt(item[2]) > years[0] && parseInt(item[2]) <= years[1]) && parseFloat(item[3]) < weights[2] &&
                item[4].toLowerCase() === category[0] &&
                (
                    item[1].toLowerCase() === belts[7] ||
                    item[1].toLowerCase() === belts[8] ||
                    item[1].toLowerCase() === belts[9]    
                )){ data.lc.push(item); }
                else if( (parseInt(item[2]) > years[0] && parseInt(item[2]) <= years[1]) && parseFloat(item[3]) < weights[3] &&
                item[4].toLowerCase() === category[0] &&
                (
                    item[1].toLowerCase() === belts[7] ||
                    item[1].toLowerCase() === belts[8] ||
                    item[1].toLowerCase() === belts[9]    
                )){ data.ld.push(item); }
                else if( (parseInt(item[2]) > years[0] && parseInt(item[2]) <= years[1]) && parseFloat(item[3]) < weights[4] &&
                item[4].toLowerCase() === category[0] &&
                (
                    item[1].toLowerCase() === belts[7] ||
                    item[1].toLowerCase() === belts[8] ||
                    item[1].toLowerCase() === belts[9]    
                )){ data.le.push(item); }
                else if( (parseInt(item[2]) > years[0] && parseInt(item[2]) <= years[1]) && parseFloat(item[3]) < weights[5] &&
                item[4].toLowerCase() === category[0] &&
                (
                    item[1].toLowerCase() === belts[7] ||
                    item[1].toLowerCase() === belts[8] ||
                    item[1].toLowerCase() === belts[9]    
                )){ data.lf.push(item); }
                else if( (parseInt(item[2]) > years[0] && parseInt(item[2]) <= years[1]) && parseFloat(item[3]) < weights[6] &&
                item[4].toLowerCase() === category[0] &&
                (
                    item[1].toLowerCase() === belts[7] ||
                    item[1].toLowerCase() === belts[8] ||
                    item[1].toLowerCase() === belts[9]   
                )){ data.lg.push(item); }
                // > 17 
                else if( parseInt(item[2]) > years[1] && parseFloat(item[3]) < weights[0] &&
                item[4].toLowerCase() === category[0] &&
                (
                    item[1].toLowerCase() === belts[7] ||
                    item[1].toLowerCase() === belts[8] ||
                    item[1].toLowerCase() === belts[9]    
                )){ data.ka.push(item); }
                else if( parseInt(item[2]) > years[1] && parseFloat(item[3]) < weights[1] &&
                item[4].toLowerCase() === category[0] &&
                (
                    item[1].toLowerCase() === belts[7] ||
                    item[1].toLowerCase() === belts[8] ||
                    item[1].toLowerCase() === belts[9]    
                )){ data.kb.push(item); }
                else if( parseInt(item[2]) > years[1] && parseFloat(item[3]) < weights[2] &&
                item[4].toLowerCase() === category[0] &&
                (
                    item[1].toLowerCase() === belts[7] ||
                    item[1].toLowerCase() === belts[8] ||
                    item[1].toLowerCase() === belts[9]    
                )){ data.kc.push(item); }
                else if( parseInt(item[2]) > years[1] && parseFloat(item[3]) < weights[3] &&
                item[4].toLowerCase() === category[0] &&
                (
                    item[1].toLowerCase() === belts[7] ||
                    item[1].toLowerCase() === belts[8] ||
                    item[1].toLowerCase() === belts[9]    
                )){ data.kd.push(item); }
                else if( parseInt(item[2]) > years[1] && parseFloat(item[3]) < weights[4] &&
                item[4].toLowerCase() === category[0] &&
                (
                    item[1].toLowerCase() === belts[7] ||
                    item[1].toLowerCase() === belts[8] ||
                    item[1].toLowerCase() === belts[9]    
                )){ data.ke.push(item); }
                else if( parseInt(item[2]) > years[1] && parseFloat(item[3]) < weights[5] &&
                item[4].toLowerCase() === category[0] &&
                (
                    item[1].toLowerCase() === belts[7] ||
                    item[1].toLowerCase() === belts[8] ||
                    item[1].toLowerCase() === belts[9]    
                )){ data.kf.push(item); }
                else if( parseInt(item[2]) > years[1] && parseFloat(item[3]) < weights[6] &&
                item[4].toLowerCase() === category[0] &&
                (
                    item[1].toLowerCase() === belts[7] ||
                    item[1].toLowerCase() === belts[8] ||
                    item[1].toLowerCase() === belts[9]   
                )){ data.kg.push(item); }
                
            });
            //console.log("Data - "+JSON.stringify(data));
            localStorage.setItem('classifiedAthletes', JSON.stringify(data));
        }
    }
    $('#filter').change(function()
    {
        var output = null, lAthletes;
        lAthletes = localStorage.getItem('classifiedAthletes'); 
        if( lAthletes !== null && lAthletes.length > 0 )
        {
            lAthletes = JSON.parse(lAthletes);
            
            lAthletes[$(this).val()].forEach(function(item)
            {
                output += '<tr>';
                var athlete = item;
                athlete.forEach(function(item)
                {
                    output += '<td>';
                    output += item;
                    output += '</td>';
                });
                output += '</tr>';
            });
            
        }
        $('tbody#allathletes').html(output);
    });
    
})(jQuery);

