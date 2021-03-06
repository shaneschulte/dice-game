#include "Player.h"
#include "StringUtils.h"

Player::Player() : name(""), score(0), win_count(0), connected(true) {}

Player::Player(std::string session) : Player() { this->session = session; }

const std::string &Player::getSession() const { return session; }

void Player::disconnect() { connected = false; }

void Player::reconnect() { connected = true; }

bool Player::isConnected() const { return connected; }

int Player::addScore(int n) {
    score += n;
    return score;
}

int Player::addWin(int n) {
    win_count += n;
    return win_count;
}

void Player::reset() { this->score = 0; }

void Player::setName(std::string &name) {
    this->name = trimString(name, MAX_PLAYER_NAME);
}

const std::string &Player::getName() const { return this->name; }

int Player::getScore() const { return this->score; }

json Player::toJson() const {
    json result;
    result["name"] = this->name;
    result["score"] = this->score;
    result["win_count"] = this->win_count;
    result["connected"] = this->connected;
    return result;
}
