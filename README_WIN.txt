== Avatars Talk

Avatars Talk is a simple chat application that utilizies WebGL to display users' 3d avatars. Avatars can be rotated by mouse. You need a WebGL enabled web browser in order to view the avatars. To find out whether your browser supports WebGL go to http://get.webgl.com website.

Temporary preview of Avatars Talk is at https://www.realityrobots.com/

= Installation Instructions -- Windows XP / Windows 7

1) Download and install Ruby 1.9.2 p290:
  http://rubyforge.org/frs/download.php/75127/rubyinstaller-1.9.2-p290.exe
  Make sure that you Add Ruby executables to your PATH.
  Note that the Avatars Talk directory must be on the same drive  (e.g. C:\) as Ruby installation directory.

2) In Avatars Talk root directory run:
  gem install bundler -v 1.1.3

3) To be able to build native extensions, RubyInstaller Development Kit (DevKit) must be installed. Download the development kit from 
  http://rubyinstaller.org/downloads/
  Uncompress the archive to e.g. C:\DevKit
  Enter the directory and run:
  ruby dk.rb init
  ruby dk.rb install
  
  In case of troubles:
  https://github.com/oneclick/rubyinstaller/wiki/Development-Kit

4) To install the other application dependencies run in Avatars Talk directory:
  bundler install
  You can ignore the message from mysql.

5) To migrate database:
  rake db:migrate

= Installation Instructions -- Ubuntu 12.04

1)
  sudo apt-get install ruby1.9.1 ruby1.9.1-dev libmysqlclient-dev libsqlite3-dev
  sudo gem install bundler -v 1.1.3

2) In Avatars Talk directory run:
  bundle install
  rake db:migrate


= Usage
To run server, run this command in Avatars Talk directory:
  rails server

Windows firewall may show a message about blocking the Ruby Interpreter. Unblock it.

Now the application is available in a web browser at localhost:3000
