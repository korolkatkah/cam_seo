# Related Articles injection script
$pagesDir = "E:\CLOUD CODE WORKSPACE\ewo-site\src\pages"

$linkingMap = @{
    'why-low-viewers-webcam'        = @('how-cam-algorithm-ranks-rooms','best-streaming-times-by-region','model-promotion','new-model-growth','platforms-we-work-with','webcam-model-income-guide')
    'how-cam-algorithm-ranks-rooms' = @('why-low-viewers-webcam','best-streaming-times-by-region','new-model-growth','model-promotion','webcam-model-income-guide','platforms-we-work-with','model-promotion-usa','model-promotion-germany','model-promotion-romania','model-promotion-ukraine','model-promotion-colombia','model-promotion-spain')
    'best-streaming-times-by-region'= @('model-promotion-usa','model-promotion-germany','model-promotion-romania','model-promotion-ukraine','model-promotion-colombia','model-promotion-spain','how-cam-algorithm-ranks-rooms','why-low-viewers-webcam')
    'webcam-model-income-guide'     = @('model-promotion','new-model-growth','why-low-viewers-webcam','how-cam-algorithm-ranks-rooms','studio-traffic','studio-scaling')
    'new-model-growth'              = @('why-low-viewers-webcam','model-promotion','platforms-we-work-with','how-cam-algorithm-ranks-rooms','best-streaming-times-by-region','webcam-model-income-guide')
    'studio-scaling'                = @('studio-traffic','model-promotion','webcam-model-income-guide','new-model-growth','platforms-we-work-with','how-cam-algorithm-ranks-rooms')
    'studio-traffic'                = @('studio-scaling','model-promotion','platforms-we-work-with','best-streaming-times-by-region','how-cam-algorithm-ranks-rooms','why-low-viewers-webcam','model-promotion-usa','model-promotion-germany','model-promotion-romania','model-promotion-ukraine','model-promotion-colombia','model-promotion-spain')
    'model-promotion'               = @('new-model-growth','why-low-viewers-webcam','platforms-we-work-with','how-cam-algorithm-ranks-rooms','webcam-model-income-guide','studio-traffic','model-promotion-usa','model-promotion-germany','model-promotion-romania','model-promotion-ukraine','model-promotion-colombia','model-promotion-spain')
    'platforms-we-work-with'        = @('model-promotion','studio-traffic','new-model-growth','best-streaming-times-by-region','how-cam-algorithm-ranks-rooms','why-low-viewers-webcam')
    'model-promotion-usa'           = @('model-promotion','best-streaming-times-by-region','how-cam-algorithm-ranks-rooms','why-low-viewers-webcam','webcam-model-income-guide','platforms-we-work-with')
    'model-promotion-germany'       = @('model-promotion','best-streaming-times-by-region','how-cam-algorithm-ranks-rooms','model-promotion-romania','webcam-model-income-guide','platforms-we-work-with')
    'model-promotion-romania'       = @('model-promotion','best-streaming-times-by-region','how-cam-algorithm-ranks-rooms','model-promotion-germany','webcam-model-income-guide','platforms-we-work-with')
    'model-promotion-ukraine'       = @('model-promotion','best-streaming-times-by-region','how-cam-algorithm-ranks-rooms','model-promotion-romania','webcam-model-income-guide','platforms-we-work-with')
    'model-promotion-colombia'      = @('model-promotion','best-streaming-times-by-region','how-cam-algorithm-ranks-rooms','model-promotion-spain','webcam-model-income-guide','platforms-we-work-with')
    'model-promotion-spain'         = @('model-promotion','best-streaming-times-by-region','how-cam-algorithm-ranks-rooms','model-promotion-colombia','webcam-model-income-guide','platforms-we-work-with')
    'resources'                     = @('why-low-viewers-webcam','how-cam-algorithm-ranks-rooms','best-streaming-times-by-region','webcam-model-income-guide','model-promotion','platforms-we-work-with','studio-traffic','new-model-growth','studio-scaling','model-promotion-usa','model-promotion-germany','model-promotion-romania','model-promotion-ukraine','model-promotion-colombia','model-promotion-spain')
    'about'                         = @('model-promotion','studio-traffic','why-low-viewers-webcam','how-cam-algorithm-ranks-rooms','platforms-we-work-with','contact')
    'contact'                       = @('model-promotion','studio-traffic','new-model-growth','studio-scaling','about','platforms-we-work-with')
}

$titles = @{}

$titles['en'] = @{
    'why-low-viewers-webcam'        = 'Why Your Webcam Room Has Low Viewers'
    'how-cam-algorithm-ranks-rooms' = 'How the Cam Algorithm Ranks Rooms'
    'best-streaming-times-by-region'= 'Best Streaming Times by Region'
    'webcam-model-income-guide'     = 'Webcam Model Income Guide'
    'new-model-growth'              = 'New Model Growth'
    'studio-scaling'                = 'Studio Scaling'
    'studio-traffic'                = 'Studio Traffic'
    'model-promotion'               = 'Model Promotion Services'
    'platforms-we-work-with'        = 'Platforms We Work With'
    'model-promotion-usa'           = 'Promotion for US Audiences'
    'model-promotion-germany'       = 'Promotion for German Audiences'
    'model-promotion-romania'       = 'Promotion for Romanian Audiences'
    'model-promotion-ukraine'       = 'Promotion for Ukrainian Audiences'
    'model-promotion-colombia'      = 'Promotion for Colombian Audiences'
    'model-promotion-spain'         = 'Promotion for Spanish Audiences'
    'resources'                     = 'Resources'
    'about'                         = 'About EWO'
    'contact'                       = 'Contact Us'
}

$titles['de'] = @{
    'why-low-viewers-webcam'        = 'Warum dein Webcam-Raum wenige Zuschauer hat'
    'how-cam-algorithm-ranks-rooms' = 'Wie der Cam-Algorithmus R' + [char]0x00e4 + 'ume bewertet'
    'best-streaming-times-by-region'= 'Beste Streaming-Zeiten nach Region'
    'webcam-model-income-guide'     = 'Einkommensguide f' + [char]0x00fc + 'r Webcam-Models'
    'new-model-growth'              = 'Wachstum f' + [char]0x00fc + 'r neue Models'
    'studio-scaling'                = 'Studio-Skalierung'
    'studio-traffic'                = 'Studio-Traffic'
    'model-promotion'               = 'Model-Promotion-Services'
    'platforms-we-work-with'        = 'Plattformen, mit denen wir arbeiten'
    'model-promotion-germany'       = 'F' + [char]0x00f6 + 'rderung f' + [char]0x00fc + 'r deutsches Publikum'
    'resources'                     = 'Ressourcen'
    'about'                         = [char]0x00dc + 'ber EWO'
    'contact'                       = 'Kontakt'
}

$titles['es'] = @{
    'why-low-viewers-webcam'        = 'Por qu' + [char]0x00e9 + ' tu sala webcam tiene pocos espectadores'
    'how-cam-algorithm-ranks-rooms' = 'C' + [char]0x00f3 + 'mo el algoritmo cam clasifica las salas'
    'best-streaming-times-by-region'= 'Mejores horarios de streaming por regi' + [char]0x00f3 + 'n'
    'webcam-model-income-guide'     = 'Gu' + [char]0x00ed + 'a de ingresos para modelos webcam'
    'new-model-growth'              = 'Crecimiento para modelos nuevas'
    'studio-scaling'                = 'Escalado de estudio'
    'studio-traffic'                = 'Tr' + [char]0x00e1 + 'fico de estudio'
    'model-promotion'               = 'Servicios de promoci' + [char]0x00f3 + 'n'
    'platforms-we-work-with'        = 'Plataformas con las que trabajamos'
    'model-promotion-colombia'      = 'Promoci' + [char]0x00f3 + 'n para audiencias colombianas'
    'model-promotion-spain'         = 'Promoci' + [char]0x00f3 + 'n para audiencias espa' + [char]0x00f1 + 'olas'
    'resources'                     = 'Recursos'
    'about'                         = 'Sobre EWO'
    'contact'                       = 'Contacto'
}

$titles['ro'] = @{
    'why-low-viewers-webcam'        = 'De ce camera ta webcam are pu' + [char]0x021b + 'ini spectatori'
    'how-cam-algorithm-ranks-rooms' = 'Cum algoritmul cam clasific' + [char]0x0103 + ' camerele'
    'best-streaming-times-by-region'= 'Cele mai bune ore de streaming pe regiune'
    'webcam-model-income-guide'     = 'Ghid de venituri pentru modele webcam'
    'new-model-growth'              = 'Cre' + [char]0x0219 + 'tere pentru modele noi'
    'studio-scaling'                = 'Scalarea studioului'
    'studio-traffic'                = 'Trafic studio'
    'model-promotion'               = 'Servicii de promovare'
    'platforms-we-work-with'        = 'Platformele cu care lucr' + [char]0x0103 + 'm'
    'model-promotion-romania'       = 'Promovare pentru publicul rom' + [char]0x00e2 + 'n'
    'resources'                     = 'Resurse'
    'about'                         = 'Despre EWO'
    'contact'                       = 'Contact'
}

# Ukrainian titles using unicode escapes
$titles['uk'] = @{
    'why-low-viewers-webcam'        = [char]0x0427 + [char]0x043e + [char]0x043c + [char]0x0443 + ' ' + [char]0x0443 + ' ' + [char]0x0442 + [char]0x0432 + [char]0x043e + [char]0x0457 + [char]0x0439 + ' ' + [char]0x0432 + [char]0x0435 + [char]0x0431 + [char]0x043a + [char]0x0430 + [char]0x043c + '-' + [char]0x043a + [char]0x0456 + [char]0x043c + [char]0x043d + [char]0x0430 + [char]0x0442 + [char]0x0456 + ' ' + [char]0x043c + [char]0x0430 + [char]0x043b + [char]0x043e + ' ' + [char]0x0433 + [char]0x043b + [char]0x044f + [char]0x0434 + [char]0x0430 + [char]0x0447 + [char]0x0456 + [char]0x0432
    'how-cam-algorithm-ranks-rooms' = [char]0x042f + [char]0x043a + ' ' + [char]0x0430 + [char]0x043b + [char]0x0433 + [char]0x043e + [char]0x0440 + [char]0x0438 + [char]0x0442 + [char]0x043c + ' ' + [char]0x043a + [char]0x0430 + [char]0x043c + ' ' + [char]0x0440 + [char]0x0430 + [char]0x043d + [char]0x0436 + [char]0x0443 + [char]0x0454 + ' ' + [char]0x043a + [char]0x0456 + [char]0x043c + [char]0x043d + [char]0x0430 + [char]0x0442 + [char]0x0438
    'best-streaming-times-by-region'= [char]0x041d + [char]0x0430 + [char]0x0439 + [char]0x043a + [char]0x0440 + [char]0x0430 + [char]0x0449 + [char]0x0438 + [char]0x0439 + ' ' + [char]0x0447 + [char]0x0430 + [char]0x0441 + ' ' + [char]0x0434 + [char]0x043b + [char]0x044f + ' ' + [char]0x0441 + [char]0x0442 + [char]0x0440 + [char]0x0438 + [char]0x043c + [char]0x0456 + [char]0x043d + [char]0x0433 + [char]0x0443 + ' ' + [char]0x043f + [char]0x043e + ' ' + [char]0x0440 + [char]0x0435 + [char]0x0433 + [char]0x0456 + [char]0x043e + [char]0x043d + [char]0x0430 + [char]0x0445
    'webcam-model-income-guide'     = [char]0x041f + [char]0x043e + [char]0x0441 + [char]0x0456 + [char]0x0431 + [char]0x043d + [char]0x0438 + [char]0x043a + ' ' + [char]0x0437 + ' ' + [char]0x0434 + [char]0x043e + [char]0x0445 + [char]0x043e + [char]0x0434 + [char]0x0456 + [char]0x0432 + ' ' + [char]0x0432 + [char]0x0435 + [char]0x0431 + [char]0x043a + [char]0x0430 + [char]0x043c + '-' + [char]0x043c + [char]0x043e + [char]0x0434 + [char]0x0435 + [char]0x043b + [char]0x0456
    'new-model-growth'              = [char]0x0417 + [char]0x0440 + [char]0x043e + [char]0x0441 + [char]0x0442 + [char]0x0430 + [char]0x043d + [char]0x043d + [char]0x044f + ' ' + [char]0x0434 + [char]0x043b + [char]0x044f + ' ' + [char]0x043d + [char]0x043e + [char]0x0432 + [char]0x0438 + [char]0x0445 + ' ' + [char]0x043c + [char]0x043e + [char]0x0434 + [char]0x0435 + [char]0x043b + [char]0x0435 + [char]0x0439
    'studio-scaling'                = [char]0x041c + [char]0x0430 + [char]0x0441 + [char]0x0448 + [char]0x0442 + [char]0x0430 + [char]0x0431 + [char]0x0443 + [char]0x0432 + [char]0x0430 + [char]0x043d + [char]0x043d + [char]0x044f + ' ' + [char]0x0441 + [char]0x0442 + [char]0x0443 + [char]0x0434 + [char]0x0456 + [char]0x0457
    'studio-traffic'                = [char]0x0422 + [char]0x0440 + [char]0x0430 + [char]0x0444 + [char]0x0456 + [char]0x043a + ' ' + [char]0x0441 + [char]0x0442 + [char]0x0443 + [char]0x0434 + [char]0x0456 + [char]0x0457
    'model-promotion'               = [char]0x041f + [char]0x043e + [char]0x0441 + [char]0x043b + [char]0x0443 + [char]0x0433 + [char]0x0438 + ' ' + [char]0x0437 + ' ' + [char]0x043f + [char]0x0440 + [char]0x043e + [char]0x0441 + [char]0x0443 + [char]0x0432 + [char]0x0430 + [char]0x043d + [char]0x043d + [char]0x044f
    'platforms-we-work-with'        = [char]0x041f + [char]0x043b + [char]0x0430 + [char]0x0442 + [char]0x0444 + [char]0x043e + [char]0x0440 + [char]0x043c + [char]0x0438 + ', ' + [char]0x0437 + ' ' + [char]0x044f + [char]0x043a + [char]0x0438 + [char]0x043c + [char]0x0438 + ' ' + [char]0x043c + [char]0x0438 + ' ' + [char]0x043f + [char]0x0440 + [char]0x0430 + [char]0x0446 + [char]0x044e + [char]0x0454 + [char]0x043c + [char]0x043e
    'model-promotion-ukraine'       = [char]0x041f + [char]0x0440 + [char]0x043e + [char]0x0441 + [char]0x0443 + [char]0x0432 + [char]0x0430 + [char]0x043d + [char]0x043d + [char]0x044f + ' ' + [char]0x0434 + [char]0x043b + [char]0x044f + ' ' + [char]0x0443 + [char]0x043a + [char]0x0440 + [char]0x0430 + [char]0x0457 + [char]0x043d + [char]0x0441 + [char]0x044c + [char]0x043a + [char]0x0438 + [char]0x0445 + ' ' + [char]0x043c + [char]0x043e + [char]0x0434 + [char]0x0435 + [char]0x043b + [char]0x0435 + [char]0x0439
    'resources'                     = [char]0x0420 + [char]0x0435 + [char]0x0441 + [char]0x0443 + [char]0x0440 + [char]0x0441 + [char]0x0438
    'about'                         = [char]0x041f + [char]0x0440 + [char]0x043e + ' EWO'
    'contact'                       = [char]0x0417 + [char]0x0432 + [char]0x2019 + [char]0x044f + [char]0x0437 + [char]0x0430 + [char]0x0442 + [char]0x0438 + [char]0x0441 + [char]0x044f
}

# Russian titles
$titles['ru'] = @{
    'why-low-viewers-webcam'        = [char]0x041f + [char]0x043e + [char]0x0447 + [char]0x0435 + [char]0x043c + [char]0x0443 + ' ' + [char]0x0432 + ' ' + [char]0x0442 + [char]0x0432 + [char]0x043e + [char]0x0435 + [char]0x0439 + ' ' + [char]0x0432 + [char]0x0435 + [char]0x0431 + [char]0x043a + [char]0x0430 + [char]0x043c + '-' + [char]0x043a + [char]0x043e + [char]0x043c + [char]0x043d + [char]0x0430 + [char]0x0442 + [char]0x0435 + ' ' + [char]0x043c + [char]0x0430 + [char]0x043b + [char]0x043e + ' ' + [char]0x0437 + [char]0x0440 + [char]0x0438 + [char]0x0442 + [char]0x0435 + [char]0x043b + [char]0x0435 + [char]0x0439
    'how-cam-algorithm-ranks-rooms' = [char]0x041a + [char]0x0430 + [char]0x043a + ' ' + [char]0x0430 + [char]0x043b + [char]0x0433 + [char]0x043e + [char]0x0440 + [char]0x0438 + [char]0x0442 + [char]0x043c + ' ' + [char]0x043a + [char]0x0430 + [char]0x043c + ' ' + [char]0x0440 + [char]0x0430 + [char]0x043d + [char]0x0436 + [char]0x0438 + [char]0x0440 + [char]0x0443 + [char]0x0435 + [char]0x0442 + ' ' + [char]0x043a + [char]0x043e + [char]0x043c + [char]0x043d + [char]0x0430 + [char]0x0442 + [char]0x044b
    'best-streaming-times-by-region'= [char]0x041b + [char]0x0443 + [char]0x0447 + [char]0x0448 + [char]0x0435 + [char]0x0435 + ' ' + [char]0x0432 + [char]0x0440 + [char]0x0435 + [char]0x043c + [char]0x044f + ' ' + [char]0x0434 + [char]0x043b + [char]0x044f + ' ' + [char]0x0441 + [char]0x0442 + [char]0x0440 + [char]0x0438 + [char]0x043c + [char]0x0438 + [char]0x043d + [char]0x0433 + [char]0x0430 + ' ' + [char]0x043f + [char]0x043e + ' ' + [char]0x0440 + [char]0x0435 + [char]0x0433 + [char]0x0438 + [char]0x043e + [char]0x043d + [char]0x0430 + [char]0x043c
    'webcam-model-income-guide'     = [char]0x0413 + [char]0x0438 + [char]0x0434 + ' ' + [char]0x043f + [char]0x043e + ' ' + [char]0x0434 + [char]0x043e + [char]0x0445 + [char]0x043e + [char]0x0434 + [char]0x0430 + [char]0x043c + ' ' + [char]0x0432 + [char]0x0435 + [char]0x0431 + [char]0x043a + [char]0x0430 + [char]0x043c + '-' + [char]0x043c + [char]0x043e + [char]0x0434 + [char]0x0435 + [char]0x043b + [char]0x0438
    'new-model-growth'              = [char]0x0420 + [char]0x043e + [char]0x0441 + [char]0x0442 + ' ' + [char]0x0434 + [char]0x043b + [char]0x044f + ' ' + [char]0x043d + [char]0x043e + [char]0x0432 + [char]0x044b + [char]0x0445 + ' ' + [char]0x043c + [char]0x043e + [char]0x0434 + [char]0x0435 + [char]0x043b + [char]0x0435 + [char]0x0439
    'studio-scaling'                = [char]0x041c + [char]0x0430 + [char]0x0441 + [char]0x0448 + [char]0x0442 + [char]0x0430 + [char]0x0431 + [char]0x0438 + [char]0x0440 + [char]0x043e + [char]0x0432 + [char]0x0430 + [char]0x043d + [char]0x0438 + [char]0x0435 + ' ' + [char]0x0441 + [char]0x0442 + [char]0x0443 + [char]0x0434 + [char]0x0438 + [char]0x0438
    'studio-traffic'                = [char]0x0422 + [char]0x0440 + [char]0x0430 + [char]0x0444 + [char]0x0438 + [char]0x043a + ' ' + [char]0x0441 + [char]0x0442 + [char]0x0443 + [char]0x0434 + [char]0x0438 + [char]0x0438
    'model-promotion'               = [char]0x0423 + [char]0x0441 + [char]0x043b + [char]0x0443 + [char]0x0433 + [char]0x0438 + ' ' + [char]0x043f + [char]0x043e + ' ' + [char]0x043f + [char]0x0440 + [char]0x043e + [char]0x0434 + [char]0x0432 + [char]0x0438 + [char]0x0436 + [char]0x0435 + [char]0x043d + [char]0x0438 + [char]0x044e
    'platforms-we-work-with'        = [char]0x041f + [char]0x043b + [char]0x0430 + [char]0x0442 + [char]0x0444 + [char]0x043e + [char]0x0440 + [char]0x043c + [char]0x044b + ', ' + [char]0x0441 + ' ' + [char]0x043a + [char]0x043e + [char]0x0442 + [char]0x043e + [char]0x0440 + [char]0x044b + [char]0x043c + [char]0x0438 + ' ' + [char]0x043c + [char]0x044b + ' ' + [char]0x0440 + [char]0x0430 + [char]0x0431 + [char]0x043e + [char]0x0442 + [char]0x0430 + [char]0x0435 + [char]0x043c
    'model-promotion-ukraine'       = [char]0x041f + [char]0x0440 + [char]0x043e + [char]0x0434 + [char]0x0432 + [char]0x0438 + [char]0x0436 + [char]0x0435 + [char]0x043d + [char]0x0438 + [char]0x0435 + ' ' + [char]0x0434 + [char]0x043b + [char]0x044f + ' ' + [char]0x0443 + [char]0x043a + [char]0x0440 + [char]0x0430 + [char]0x0438 + [char]0x043d + [char]0x0441 + [char]0x043a + [char]0x0438 + [char]0x0445 + ' ' + [char]0x043c + [char]0x043e + [char]0x0434 + [char]0x0435 + [char]0x043b + [char]0x0435 + [char]0x0439
    'resources'                     = [char]0x0420 + [char]0x0435 + [char]0x0441 + [char]0x0443 + [char]0x0440 + [char]0x0441 + [char]0x044b
    'about'                         = [char]0x041e + ' EWO'
    'contact'                       = [char]0x0421 + [char]0x0432 + [char]0x044f + [char]0x0437 + [char]0x0430 + [char]0x0442 + [char]0x044c + [char]0x0441 + [char]0x044f
}

$headings = @{
    'en' = 'Related Articles'
    'de' = 'Verwandte Artikel'
    'es' = 'Art' + [char]0x00ed + 'culos relacionados'
    'ro' = 'Articole ' + [char]0x00ee + 'nrudite'
    'uk' = [char]0x041f + [char]0x043e + [char]0x0432 + [char]0x2019 + [char]0x044f + [char]0x0437 + [char]0x0430 + [char]0x043d + [char]0x0456 + ' ' + [char]0x0441 + [char]0x0442 + [char]0x0430 + [char]0x0442 + [char]0x0442 + [char]0x0456
    'ru' = [char]0x0421 + [char]0x0432 + [char]0x044f + [char]0x0437 + [char]0x0430 + [char]0x043d + [char]0x043d + [char]0x044b + [char]0x0435 + ' ' + [char]0x0441 + [char]0x0442 + [char]0x0430 + [char]0x0442 + [char]0x044c + [char]0x0438
}

$files = Get-ChildItem $pagesDir -Recurse -Filter "*.astro" | Where-Object { $_.Name -ne 'index.astro' }

$processed = 0
$skipped = 0

foreach ($file in $files) {
    $relativePath = $file.FullName.Substring($pagesDir.Length + 1)
    $parts = $relativePath -split '\\'

    if ($parts.Count -eq 1) {
        $lang = 'en'
        $slug = $parts[0] -replace '\.astro$', ''
    } else {
        $lang = $parts[0]
        $slug = $parts[1] -replace '\.astro$', ''
    }

    if (-not $linkingMap.ContainsKey($slug)) {
        Write-Host "SKIP (no map): $relativePath"
        $skipped++
        continue
    }

    if (-not $titles.ContainsKey($lang)) {
        Write-Host "SKIP (unknown lang): $relativePath"
        $skipped++
        continue
    }

    $langTitles = $titles[$lang]
    $heading = $headings[$lang]
    $prefix = if ($lang -eq 'en') { '' } else { "/$lang" }

    $links = @()
    foreach ($targetSlug in $linkingMap[$slug]) {
        if ($langTitles.ContainsKey($targetSlug)) {
            $href = "$prefix/$targetSlug"
            $title = $langTitles[$targetSlug]
            $links += "          <li><a href=`"$href`">$title</a></li>"
        }
    }

    if ($links.Count -eq 0) {
        Write-Host "SKIP (no links): $relativePath"
        $skipped++
        continue
    }

    $listItems = $links -join "`n"
    $section = "`n      <section class=`"related-articles`">`n        <h2>$heading</h2>`n        <ul>`n$listItems`n        </ul>`n      </section>"

    $content = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)

    if ($content -match 'related-articles') {
        Write-Host "SKIP (already injected): $relativePath"
        $skipped++
        continue
    }

    $injectionPattern = "`n    </div>`n  </article>"
    $idx = $content.LastIndexOf($injectionPattern)

    if ($idx -lt 0) {
        Write-Host "WARN (pattern not found): $relativePath"
        $skipped++
        continue
    }

    $newContent = $content.Substring(0, $idx) + $section + $content.Substring($idx)
    [System.IO.File]::WriteAllText($file.FullName, $newContent, [System.Text.Encoding]::UTF8)
    Write-Host "OK: $relativePath ($($links.Count) links)"
    $processed++
}

Write-Host ""
Write-Host "Done. Processed: $processed, Skipped: $skipped"