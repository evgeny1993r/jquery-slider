# jquery-slider - плагин для библиотеки jQuery.

При разработке плагина, использовалась архитектура MVP (Model-Viev-Presenter).

В главном файле index.ts находится оболочка jQuery для jquery-plugin.

В качестве параметра, плагин принимает обьект, в котром могут быть указаны следующие ключи со значениями: 
    >position: string
    >>>    'gorizontal' - (по умолчанию) устанавливает горизонтальное положение,
        'vertical' - устанавливает вертикальное положение
    - interval: boolean
        false - (по умолчанию одиночное значение)
        true - устанавливает интервал значения
    - min_value: number
        0 - (по умолчанию) - устанавливает минимальное значение,
    - max_value: number
        100 - (по умолчанию) - устанавливает максимальное значение,
    - current_value: number
        0 (по умолчанию), (работает только при interval: false) - устанавливает текущее значение,
    - current_value_min: number
        0 (по умолчанию), (работает только при interval: true) - устанавливает минимальное текущее значение,
    - current_value_max: number
        100 (по умолчанию), (работает только при interval: true) - устанавливает максимальное текущее значение,
    - step: number
        1 (по умолчанию) - устанавливает шаг
    - show_window_value: boolean
        false (по умолчанию) - устанавливает отображение флажка над кнопками
    - $input: JQuery
        $() - (по умолчанию пустой обьект jQuery) - устанавливает элемент типа input для синхронизации текущего значения

Плагин имеет два метода:
    - setCurrentValue: number - устанавливает текущее значение (работеат при intrval: false),
    - setCurrentValues: [number, number] - устанавливает минимальное текущее значение и максимально текущее значение (работает при interval: true)

При использовании плагина, вызывается класс Presenter, который принимает в качестве параметра - обьект с параметрами, и вызвается метод init.

В конструкторе класса Presenter вызывается класс Model и класс View в которые передаются необходимые параметры, за тем вызвается метод init, который в зависимости от параметра interval создает необходимые методы и вызвает метод init классов Model и View, подписывается на необходимые события.

В конструктор Model передаются параметры, вызвается метод init, который взависимости от параметра interval, создает соответствующие методы.

В конструктор View передаются параметры, из Model через Presenter, далее они обрабатываются и сохроняются, вызываются импортированные классы компоненты, вызывается метод init, который в зависимости от параметра interval создает необходимые методы, отрисовывает элементы в DOM, собирает необходимые данные из DOM, подписывается на события из классов компонентов и создает события.

При изменении положения ползунка, клике по шкале, изменение значения в input, создается событие (которое слушает Presenter).
После отлавливания события, Presenter вызвает необходимый метод из Model, и за тем вызавет метод обновления данных из View.
View после обновления данных, перерисовывает обновления в DOM.