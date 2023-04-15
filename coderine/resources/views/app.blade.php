<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="csrf-token" content="{{ csrf_token() }}">
	<title>{{env('APP_NAME')}}</title>

	@vite('resources/css/app.css')
</head>
<body>
	@if(Auth::check())
		<script>
			window.Laravel = {!! json_encode([
				'isLoggein' => true,
				'user' => Auth::user(),
			]) !!};
		</script>
	@else
		<script>
			window.Laravel = {!! json_encode([
				'isLoggein' => false,
			]) !!};
		</script>
	@endif

	<div id="app"></div>
	@vite('resources/js/app.js')
</body>
</html>